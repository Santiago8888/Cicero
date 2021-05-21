import { iRecordings } from './Forum/Recordings'
import { iDoubt, iForum } from './Forum/Forum'
import { iPost } from './Forum/Posts'

import { iLoginInput, Login } from './Auth/Login'
import { Landing } from './Auth/Landing'
import { iLesson } from './LayOut/Menu'
import { Content } from './Content'
import { iUser } from '../App'

import { User } from 'realm-web'
import { Iteraction } from './Interaction'


interface iHome { 
    user?:iUser
    isLogin:boolean
    isWelcome:boolean
    lesson:iLesson
    forum?:iForum
    questions?:iPost[]
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

    isLogin, 
    isWelcome,

    lesson, 
    forum, 
    questions,
    recordings, 

    next,
    approve,
    setWelcome,
    createUser,
    login,
    submit
}: iHome) => {
    return user
        ?   forum || recordings || questions 
            ?   <Iteraction forum={forum} recordings={recordings} questions={questions} submit={submit}/>
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
