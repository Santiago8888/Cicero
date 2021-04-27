import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iForum } from './Forum/Forum'

import { Document, Quiz, Video } from './Views'
import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'
import { Login } from './Auth/Login'


interface iHome { isAuth:boolean, isLogin:boolean, lesson:iLesson, forum?:iForum, recordings?:iRecordings }
export const Home = ({ isAuth, isLogin, lesson, forum, recordings }: iHome) => {
    return isAuth
        ?   isLogin ?  <Login submit={()=>{}}/>
            :   forum ? <Forum {...forum}/>
            :   recordings ? <Recordings {...recordings}/>
            :   lesson.type === 'Video' ? <Video {...lesson} next={() => {}}/>
            :   lesson.type === 'Reading' ? <Document {...lesson} next={() => {}}/>
            :   lesson.type === 'Quiz' ? <Quiz  {...lesson} next={() => {}}/> : <Landing/>
        :   <Landing/>
}
