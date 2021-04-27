import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'

import { Login, iLogin } from './Auth/Login'
import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'
import { Content } from './Content'
import { iUser } from '../App'


interface iHome extends iLogin { 
    user:iUser
    isAuth:boolean, 
    isLogin:boolean, 
    lesson:iLesson, 
    forum?:iForum, 
    recordings?:iRecordings 
    next():void
    approve(score?:number):boolean | void
    submit(doubt:iDoubt):void
}

export const Home = ({ user, isAuth, isLogin, lesson, forum, recordings, login, next, approve, submit }: iHome) => {
    return isAuth
        ?   isLogin ?  <Login login={login}/>
            :   forum ? <Forum {...forum} submit={submit}/>
            :   recordings ? <Recordings {...recordings}/>
            :   <Content user={user} lesson={lesson} next={next} approve={approve}/>
        :   <Landing/>
}
