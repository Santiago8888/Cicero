// npx ts-node createUser

import { iPlanet } from '../app/src/components/Astral/AstralChart'
import { iPosition } from '../app/src/components/LayOut/Menu'
import { iUser } from '../app/src/App'
// import users from './data/users.json'

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

    const sun = planets.find(({name}:{name:string}) => name === 'Sun')
    const sign = mapSign(sun)
    return { sign, natalChart:{planets, houses}}
}


interface iCreateUser  { name:string, email:string, password:string, date?:Date, location?:string }
const createUser = async({ name, email, password, date, location }:iCreateUser) => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })

    await app.emailPasswordAuth.registerUser({ email, password })
    await app.logIn(Credentials.emailPassword(email, password))    

    if(!app.currentUser) throw('No current user.')
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


    console.log(user.name, user.sign)
    await db.collection('users').insertOne(user)
}


const createUsers = async(users:iCreateUser[], index:number) => {
    try { await createUser(users[index]) }
    catch(e) { console.log(`Error creating: ${users[index].name}. ${e}`)}
    
    if(index + 1 === users.length) return
    createUsers(users, index + 1)
}



export interface csvUser {
    Name?: string
    User: string
    Email: string
    Password: string
    Year?: string
    Month?: string
    Day?: string
    Hour?: string
    Minute?: string
    Location?: string
}



const init = async(csvUsers:csvUser[]) => {
    const newUsers:iCreateUser[] = csvUsers.map(user => { 
        const newUser:iCreateUser = {
            name:user.User,
            email:user.Email,
            password:user.Password,
        }

        if(user.Location) newUser.location = user.Location
        if(user.Year && user.Month && user.Day) {
            newUser.date = new Date(
                Number(user.Year), 
                Number(user.Month), 
                Number(user.Day), 
                Number(user.Hour || 0), 
                Number(user.Minute || 0)
            )
        }

        return newUser
    })

    await createUsers(newUsers, 0)
}


init([])
