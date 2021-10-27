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

    next():void
    createUser(loginInput:iLoginInput):void
    approve(score?:number):boolean | void
    login(loginInput:iLoginInput):void
    submit(doubt:iDoubt):void
    setWelcome():void
}

export const Home = ({
    user, 
    mongoUser, 
    isWelcome,
    next,
    approve,
    setWelcome, 
    createUser, 
    isLogin, 
    login, 
    lesson, 
    forum, 
    recordings, 
    submit
}: iHome) => {
    return user
        ?   forum 
            ?   <Forum {...forum} submit={submit}/>
            :   recordings ? <Recordings {...recordings}/>
            :   <Content user={user} lesson={lesson} next={next} approve={approve}/>
        :   isLogin 
            ?  <Login login={login} newUser={false}/>
            :   <Landing 
                    mongoUser={mongoUser} 
                    isWelcome={isWelcome} 
                    setWelcome={setWelcome}
                    createUser={createUser}
                />
}
