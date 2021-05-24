import { iRecordings } from './Forum/Recordings'
import { iDoubt, iForum } from './Forum/Forum'
import { iPost } from './Forum/Posts'

import { iLoginInput, Login } from './Auth/Login'
import { Interaction } from './Interaction'
import { iNewUser } from './Auth/SignUp'
import { Landing } from './Auth/Landing'
import { Content } from './Content'
import { iUser } from '../App'

import { App } from 'realm-web'
import { Units } from '../data/data'


interface iHome { 
    app?:App
    user?:iUser
    isLogin:boolean
    isWelcome:boolean

    forum?:iForum
    posts?:iPost[]
    recordings?:iRecordings 

    next():void
    createUser(newUser:iNewUser):void
    approve(score?:number):boolean | void
    login(loginInput:iLoginInput):void
    submit(doubt:iDoubt):void
    setWelcome():void

    like(id:string):void
    post(post:iPost):void
    likePost(id:string):void
    reply(text:string, id:string):void
}

export const Home = ({
    app,
    user, 
    isLogin,
    isWelcome,

    forum, 
    posts,
    recordings, 

    next,
    approve,
    setWelcome,
    createUser,
    login,
    submit,

    like,
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
                    like={like}
                    submit={submit}
                    post={post}
                    reply={reply}
                    likePost={likePost}
                />
            :   <Content 
                    user={user} 
                    next={next} 
                    approve={approve}
                    lesson={Units[user.current.unit || 0].modules[user.current.module || 0].lessons[user.current.lesson || 0]} 
                />
        :   isLogin 
            ?  <Login login={login}/>
            :   <Landing app={app} isWelcome={isWelcome} setWelcome={setWelcome} createUser={createUser}/>
}
