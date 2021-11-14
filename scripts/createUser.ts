import { iPlanet } from '../app/src/components/Astral/AstralChart'
import { iPosition } from '../app/src/components/LayOut/Menu'
import { iNewUser } from '../app/src/components/Auth/SignUp'
import { iUser } from '../app/src/App'

import { App as RealmApp, Credentials } from 'realm-web'
import axios from 'axios'

require('dotenv').config()


export type Sign = 'Ari' | 'Tau' | 'Gem' | 'Can' | 'Leo' | 'Vir' | 'Lib' | 'Sco' | 'Sag' | 'Cap' | 'Aqu' | 'Pis' 
const mapSign = (sun:iPlanet):Sign => {
    const signs:Sign[] = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis' ]
    const sign = signs[sun.house - 1]
    return sign
}

const createUser = async({ name, email, password, date, location }:iNewUser) => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })

    try{
        await app.emailPasswordAuth.registerUser(email, password)
        await app.logIn(Credentials.emailPassword(email, password))    
    } catch(e){ return }

    if(!app.currentUser) return
    const { id:user_id } = app.currentUser

    const mongo = app.currentUser.mongoClient('mongodb-atlas')
    const db = mongo.db('Cicero')

    const initialPosition = { unit:0, module:0, lesson:0 }
    const current: iPosition = initialPosition
    const progress: iPosition = initialPosition

    const natalChart = {planets:[], houses:[]}
    const user:iUser = { user_id, name, email, date, location, quizFailures:0, current, progress, natalChart }

    await db.collection('users').insertOne(user)        
    const chartParams = `?query="${location}"&year=${date.getFullYear()}&month=${
        date.getMonth() + 1}&day=${date.getDate()}&hour=${date.getHours()}&minute=${date.getMinutes()
    }`

    const { data: { houses, planets } } =  await axios.get(`/.netlify/functions/astro-chart${chartParams}`)
    console.log(houses, planets)

    const sun = planets.find(({name}:{name:string}) => name === 'Sun')
    const sign = mapSign(sun)
    const fullUser = {...user, sign, natalChart:{planets, houses}}

    db.collection('users').updateOne({ user_id }, {...fullUser, user_id})
}
