import { App as RealmApp, Credentials } from 'realm-web'
import { promises as fs } from 'fs'
import { iUser } from '../app/src/App'


require('dotenv').config()


const dumpUsers = async() => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })

    await app.logIn(Credentials.emailPassword(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PWD as string))

    if(!app.currentUser) throw('No current user.')

    const mongo = app.currentUser.mongoClient('mongodb-atlas')
    const db = mongo.db('Cicero')

    const users:iUser[] = await db.collection('users').find()
    console.log('Users', users.length)

    const mappedUsers = users.map(({ progress:p, email, name, sign }) => ({
        email, 
        name,
        module: p.unit + 1, 
        unit: p.module + 1, 
        lesson:p.lesson + 1,
        sign
    }))

    const usersData = JSON.stringify(mappedUsers)
    await fs.writeFile('./data/dump.json', usersData)
}

dumpUsers().catch(console.log)
