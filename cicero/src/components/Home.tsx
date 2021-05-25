import { iRecordings } from './Forum/Recordings'
import { iDoubt, iForum } from './Forum/Forum'
import { iPost } from './Forum/Posts'

import { iLoginInput, Login } from './Auth/Login'
import { Interaction } from './Interaction'
import { iNewUser } from './Auth/SignUp'
import { Landing } from './Auth/Landing'
import { Units } from '../data/data'
import { Content } from './Content'
import { iUser } from '../App'



interface iHome { 
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

    like(id:number):void
    post(post:iPost):void
    likePost(id:string):void
    reply(text:string, id:string):void
}

export const Home = ({
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
                    user={user} 
                    posts={posts} 
                    forum={forum} 
                    recordings={recordings} 
                    likePost={likePost}
                    submit={submit}
                    reply={reply}
                    like={like}
                    post={post}
                />
            :   <Content 
                    user={user} 
                    next={next} 
                    approve={approve}
                    lesson={Units[user.current.unit || 0].modules[user.current.module || 0].lessons[user.current.lesson || 0]} 
                />
        :   isLogin 
            ?  <Login login={login}/>
            :   <Landing isWelcome={isWelcome} setWelcome={setWelcome} createUser={createUser}/>
}
