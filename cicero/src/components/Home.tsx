import { iRecordings } from './Forum/Recordings'
import { iDoubt, iForum } from './Forum/Forum'
import { iPost } from './Forum/Posts'

import { iLoginInput, Login } from './Auth/Login'
import { Interaction } from './Interaction'
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
    posts?:iPost[]
    recordings?:iRecordings 
    mongoUser?:User

    next():void
    createUser(loginInput:iLoginInput):void
    approve(score?:number):boolean | void
    login(loginInput:iLoginInput):void
    submit(doubt:iDoubt):void
    setWelcome():void

    post(post:iPost):void
    likePost(id:string):void
    reply(text:string, id:string):void
}

export const Home = ({
    user, 
    mongoUser, 

    isLogin, 
    isWelcome,

    lesson, 
    forum, 
    posts,
    recordings, 

    next,
    approve,
    setWelcome,
    createUser,
    login,
    submit,

    post,
    reply,
    likePost
}: iHome) => {
    return user
        ?   forum || recordings || posts 
            ?   <Interaction 
                    forum={forum} 
                    recordings={recordings} 
                    posts={posts} 
                    submit={submit}
                    post={post}
                    reply={reply}
                    likePost={likePost}
                />
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
