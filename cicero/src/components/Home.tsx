import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iForum } from './Forum/Forum'

import { Document, Quiz, Video } from './Views'
import { Login, iLogin } from './Auth/Login'
import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'


interface iHome extends iLogin { isAuth:boolean, isLogin:boolean, lesson:iLesson, forum?:iForum, recordings?:iRecordings }
export const Home = ({ isAuth, isLogin, lesson, forum, recordings, login }: iHome) => {
    return isAuth
        ?   isLogin ?  <Login login={login}/>
            :   forum ? <Forum {...forum}/>
            :   recordings ? <Recordings {...recordings}/>
            :   lesson.type === 'Video' ? <Video {...lesson} next={() => {}}/>
            :   lesson.type === 'Reading' ? <Document {...lesson} next={() => {}}/>
            :   lesson.type === 'Quiz' ? <Quiz  {...lesson} next={() => {}}/> : <Landing/>
        :   <Landing/>
}
