// npx ts-node createUser

import { iPlanet } from '../app/src/components/Astral/AstralChart'
import { iPosition } from '../app/src/components/LayOut/Menu'
import { iNewUser } from '../app/src/components/Auth/SignUp'
import { iUser } from '../app/src/App'
import users from './data/users.json'

import { App as RealmApp, Credentials } from 'realm-web'
import axios from 'axios'

require('dotenv').config()


export type Sign = 'Ari' | 'Tau' | 'Gem' | 'Can' | 'Leo' | 'Vir' | 'Lib' | 'Sco' | 'Sag' | 'Cap' | 'Aqu' | 'Pis' 
const mapSign = (sun:iPlanet):Sign => {
    const signs:Sign[] = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis' ]
    const sign = signs[sun.house - 1]
    return sign
}

const getChart = async(date:Date, location:string) => {
    const chartParams = `?query="${location}"&year=${date.getFullYear()}&month=${
        date.getMonth() + 1}&day=${date.getDate()}&hour=${date.getHours()}&minute=${date.getMinutes()
    }`

    const url = `https://astroconsciencia.gq/.netlify/functions/astro-chart${chartParams}`
    const { data: { houses, planets } } =  await axios.get(url)
    console.log(houses, planets)

    const sun = planets.find(({name}:{name:string}) => name === 'Sun')
    const sign = mapSign(sun)
    return { sign, natalChart:{planets, houses}}
}


interface iCreateUser  { name:string, email:string, password:string, date?:Date, location?:string }
const createUser = async({ name, email, password, date, location }:iCreateUser) => {
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

    const natalChart = { planets:[], houses:[] }
    const user:iUser = { 
        user_id, 
        name, 
        email, 
        current, 
        progress, 
        natalChart, 
        quizFailures:0, 
        date: date || new Date(),
        location: location || ''
    }

    if(date && location){
        try { 
            const { sign, natalChart } = await getChart(date, location)
    
            user.sign = sign
            user.natalChart = natalChart
    
        } catch(e){ }    
    }


    await db.collection('users').insertOne(user)
}

const Santiago:iNewUser = {
    date:new Date(1988, 7, 17, 18, 37),
    name:'Santiago Test Create',
    email:'santiago1@test.mail',
    password:'A23451',
    location:'Mexico City'
}

const createUsers = async(users:iCreateUser[], index:number) => {
    if(index + 1 === users.length) return

    try { await createUser(users[index]) }
    catch(e) { console.log(`Error creating: ${users[index].name}`)}
    
    createUsers(users, index + 1)
}

const init = async() => {
    const newUsers:iCreateUser[] = users.map(user => { 
        const newUser:iCreateUser = {
            name:user.Name,
            email:user.Email,
            password:user.Password,
        }

        if(user.Location) newUser.location = user.Location
        if(user.Year) {
            newUser.date = new Date(
                Number(user.Year), 
                Number(user.Month), 
                Number(user.Day), 
                Number(user.Hour), 
                Number(user.Minute)
            )
        }

        return newUser
    })

    await createUsers(newUsers, 0)
}
