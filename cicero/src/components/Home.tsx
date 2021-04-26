import { Document, Quiz, Video } from './Views'
import { Recordings } from './Forum/Recordings'

import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'
import { Forum } from './Forum/Forum'


interface iHome { isAuth:boolean, lesson: iLesson, isForum:boolean, isRecordings:boolean }
export const Home = ({ isAuth, lesson, isForum, isRecordings }: iHome) => {
    return isAuth
        ?   isForum ?   <Forum title={''} questions={[]} description={''}/>
        :   isRecordings ? <Recordings recordings={[]} title={''} description={''}/>
        :   lesson.type === 'Video' ? <Video {...lesson} next={() => {}}/>
        :   lesson.type === 'Lectura' ? <Document {...lesson} next={() => {}}/>
        :   lesson.type === 'Quiz' ? <Quiz  {...lesson} next={() => {}}/> : <Landing/>
        :   <Landing/>

}
