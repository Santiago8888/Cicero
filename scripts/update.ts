import { iPlanet } from '../app/src/components/Astral/AstralChart'
import { App as RealmApp, Credentials } from 'realm-web'
import { iUser } from '../app/src/App' 
import users from './data/users.json'
import { getHouse } from './house'
import axios from 'axios'

require('dotenv').config()

type Sign = 'Ari' | 'Tau' | 'Gem' | 'Can' | 'Leo' | 'Vir' | 'Lib' | 'Sco' | 'Sag' | 'Cap' | 'Aqu' | 'Pis' 
const mapSign = (planet:iPlanet):Sign => {
    const signs:Sign[] = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis' ]
    const sign = signs[planet.house - 1]
    return sign
}


interface iBirth { day:number, month:number, year:number, hour:number, minute:number }
const getChart = async({ year, month, day, hour, minute }:iBirth, location:string) => {
    const chartParams = `?query="${location}"&year=${year}&month=${month + 1}&day=${day}&hour=${hour}&minute=${minute}`

    const url = `http://localhost:8888/.netlify/functions/astro-chart${chartParams}`
    const { data: { houses, planets } } =  await axios.get(url)

    const planet = planets.find(({name}:{name:string}) => name === 'Saturn')
    const sign = mapSign(planet)

    const degrees = (planet.house*30) - 30 + planet.degrees
    const house = getHouse(degrees, houses) + 1

    return { sign, natalChart:{ planets, houses }, house }
}

const fetchUser = async(email:string, birth:iBirth, location:string) => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })

    await app.logIn(Credentials.emailPassword(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PWD as string))

    if(!app.currentUser) throw('No current user.')

    const mongo = app.currentUser.mongoClient('mongodb-atlas')
    const db = mongo.db('Cicero')

    const user:iUser = await db.collection('users').findOne({ email })

    user.birth = birth

    const { sign, natalChart, house } = await getChart(birth, location)
    console.log(sign, house)

    user.sign = sign
    user.natalChart = natalChart
    user.house = house
    
    await db.collection('users').updateOne({ email }, user)
}


const updateUser = async(email:string) => {
    const user = users.find(({ Email }) => Email === email)
    // console.log('user', user)

    if(!user) return
    const { Day, Month, Year, Hour, Minute } = user

    if(Day.length === 0) return
    if(Month.length === 0) return
    if(Year.length === 0) return
    if(Hour.length === 0) return
    if(Minute.length === 0) return

    const day = Number(Day)
    const month = Number(Month)
    const year = Number(Year)
    const hour = Number(Hour)
    const minute = Number(Minute)

    const birth = { day, month, year, hour, minute }
    await fetchUser(email, birth, user.Location).catch(console.log)
}

const update = async(idx:number) => {
    if(idx === users.length -1) return

    const email = users[idx].Email
    console.log(idx, email)
    await updateUser(email)

    await update(idx + 1)
}


// update(0)
updateUser('')
