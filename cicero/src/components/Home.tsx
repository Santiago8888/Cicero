import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'

import { iLoginInput, Login } from './Auth/Login'
import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'
import { Content } from './Content'
import { iUser } from '../App'

import { User } from 'realm-web'


interface iHome { 
    user?:iUser
    isLogin:boolean
    isWelcome:boolean
    lesson:iLesson
    forum?:iForum
    recordings?:iRecordings 
    mongoUser?:User
    db?:Realm.Services.MongoDBDatabase

    next():void
    approve(score?:number):boolean | void
    login(loginInput:iLoginInput):void
    submit(doubt:iDoubt):void
    setWelcome():void
}

export const Home = ({ user, isLogin, lesson, forum, recordings, mongoUser, db, login, next, approve, submit, isWelcome, setWelcome }: iHome) => {
    return user
        ?   forum 
            ?   <Forum {...forum} submit={submit}/>
            :   recordings ? <Recordings {...recordings}/>
            :   <Content user={user} lesson={lesson} next={next} approve={approve}/>
        :   isLogin 
            ?  <Login login={login} newUser={false}/>
            :   <Landing mongoUser={mongoUser} db={db as Realm.Services.MongoDBDatabase} isWelcome={isWelcome} setWelcome={setWelcome}/>
}
