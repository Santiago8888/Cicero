import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'
import { Posts, iPost } from './Forum/Posts'

import { Error } from './Error'


interface iInteraction { 
    forum?:iForum
    recordings?:iRecordings 
    posts?:iPost[]

    submit(doubt:iDoubt):void
    post(post:iPost):void
    likePost(id:string):void
    reply(text:string, postId:string):void
}

export const Interaction = ({ forum, recordings, posts, submit, post, likePost, reply }: iInteraction) => {

    return  forum ? <Forum {...forum} submit={submit}/>
        :   recordings ? <Recordings {...recordings}/>
        :   posts ?  <Posts posts={posts} post={post} reply={reply} like={likePost}/>
    : <Error/>
}
