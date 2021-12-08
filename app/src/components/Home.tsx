import { iRecordings } from './Forum/Recordings'
import { iDoubt, iForum } from './Forum/Forum'
import { iPost } from './Forum/Posts'

import { iLoginInput, Login } from './Auth/Login'
import { Interaction } from './Interaction'
import { Landing } from './Auth/Landing'
import { Units } from '../data/data'
import { Content } from './Content'
import { iApprove, iUser } from '../App'


export type Approve = boolean | void | Promise<void>
interface iHome { 
    user?:iUser
    isLogin:boolean

    forum?:iForum
    posts?:iPost[]
    recordings?:iRecordings 

    next():void
    setLogin():void
    approve(props:iApprove):Approve
    login(loginInput:iLoginInput):void
    submit(doubt:iDoubt):void

    like(id:number):void
    post(post:iPost):void
    likePost(id:number):void
    reply(text:string, id:number):void
}

export const Home = ({
    user, 
    isLogin,

    forum, 
    posts,
    recordings, 

    next,
    setLogin,
    approve,
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
            :  <Landing setLogin={setLogin}/>
}
