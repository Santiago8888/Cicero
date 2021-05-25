import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'
import { Posts, iPost } from './Forum/Posts'
import { Error } from './Error'
import { iUser } from '../App'


interface iInteraction { 
    user:iUser
    forum?:iForum
    recordings?:iRecordings 
    posts?:iPost[]

    like(id:number):void
    submit(doubt:iDoubt):void
    post(post:iPost):void
    likePost(id:number):void
    reply(text:string, id:number):void
}

export const Interaction = ({ user, forum, recordings, posts, submit, post, likePost, reply, like }: iInteraction) => {

    return  forum ? <Forum {...forum} user={user} submit={submit} like={like}/>
        :   recordings ? <Recordings {...recordings}/>
        :   posts ?  <Posts user={user} posts={posts} post={post} reply={reply} like={likePost}/>
    : <Error/>
}
