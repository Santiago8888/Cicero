import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'

import { Login, iLogin } from './Auth/Login'
import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'
import { Content } from './Content'
import { iUser } from '../App'

import { User } from 'realm-web'


interface iHome extends iLogin { 
    user?:iUser
    isLogin:boolean
    lesson:iLesson
    forum?:iForum
    recordings?:iRecordings 
    mongoUser?:User
    db?:Realm.Services.MongoDBDatabase

    next():void
    approve(score?:number):boolean | void
    submit(doubt:iDoubt):void
}

export const Home = ({ user, isLogin, lesson, forum, recordings, mongoUser, db, login, next, approve, submit }: iHome) => {
    return user
        ?   isLogin ?  <Login login={login}/>
            :   forum ? <Forum {...forum} submit={submit}/>
            :   recordings ? <Recordings {...recordings}/>
            :   <Content user={user} lesson={lesson} next={next} approve={approve}/>
        :   <Landing mongoUser={mongoUser} db={db as Realm.Services.MongoDBDatabase}/>
}
