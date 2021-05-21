import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'
import { Posts, iPost } from './Forum/Posts'

import { Error } from './Error'


interface iIteraction { 
    forum?:iForum
    recordings?:iRecordings 
    posts?:iPost[]
    submit(doubt:iDoubt):void
}

export const Iteraction = ({ forum, recordings, posts, submit }: iIteraction) => {

    return  forum ? <Forum {...forum} submit={submit}/>
        :   recordings ? <Recordings {...recordings}/>
        :   posts ?  <Posts posts={posts} submit={() => {}} reply={() => {}} like={() => {}}/>
    : <Error/>
}
