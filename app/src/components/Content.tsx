import { Document, Quiz, Video } from './Views'
import { Reflection } from './Views/Reflection'
import { iLesson } from './LayOut/Menu'
import { Chart } from './Views/Chart'
import { iApprove, iUser } from '../App'
import { Error } from './Error'


interface iContent { 
    user:iUser
    lesson:iLesson, 
    next():void
    approve(props:iApprove):boolean | void
}

export const Content = ({ user, lesson, next, approve }: iContent) => {
    return  lesson.type === 'Video' ? <Video user={user} {...lesson} next={next} approve={approve}/>
        :   lesson.type === 'Reading' ? <Document user={user} {...lesson} next={next} approve={approve}/>
        :   lesson.type === 'Quiz' ? <Quiz  {...lesson} next={next} approve={approve} user={user}/> 
        :   lesson.type === 'Chart' ? <Chart user={user} {...lesson} next={next} approve={approve} />
        :   lesson.type === 'Reflection' ? <Reflection user={user} next={next} approve={approve} {...lesson} />
    : <Error/>
}
