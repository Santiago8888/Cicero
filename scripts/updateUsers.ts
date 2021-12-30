import { iPlanet } from '../app/src/components/Astral/AstralChart'
import { App as RealmApp, Credentials } from 'realm-web'
import axios from 'axios'

require('dotenv').config()

type Sign = 'Ari' | 'Tau' | 'Gem' | 'Can' | 'Leo' | 'Vir' | 'Lib' | 'Sco' | 'Sag' | 'Cap' | 'Aqu' | 'Pis' 
const mapSign = (sun:iPlanet):Sign => {
    const signs:Sign[] = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis' ]
    const sign = signs[sun.house - 1]
    return sign
}


const getChart = async(date:Date, location:string) => {
    const chartParams = `?query="${location}"&year=${date.getFullYear()}&month=${
        date.getMonth() + 1}&day=${date.getDate()}&hour=${date.getHours()}&minute=${date.getMinutes()
    }`

    const url = `http://localhost:8888/.netlify/functions/astro-chart${chartParams}`
    const { data: { houses, planets } } =  await axios.get(url)

    const sun = planets.find(({name}:{name:string}) => name === 'Saturn')
    const sign = mapSign(sun)
    
    return { sign, natalChart:{planets, houses}}
}

const finished = { progress:{ unit:0, module:2, lesson:3 }}
const fetchUser = async() => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })

    await app.logIn(Credentials.emailPassword(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PWD as string))

    if(!app.currentUser) throw('No current user.')

    const mongo = app.currentUser.mongoClient('mongodb-atlas')
    const db = mongo.db('Cicero')

    const user = await db.collection('users').findOne({ email:"san@astro.mail" })
    console.log(user)

    if(!user.date || !user.location) return

    const { sign, natalChart } = await getChart(user.date, user.location)
    user.sign = sign
    user.natalChart = natalChart

    // user.progress = { unit:1, module:0, lesson:0 }
    // user.current = { unit:1, module:0, lesson:0 }
    
    console.log(user.email, user.sign)
    await db.collection('users').updateOne({ email:user.email }, user)
}

fetchUser().catch(console.log)
