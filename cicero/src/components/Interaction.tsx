import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'
import { Posts, iPost } from './Forum/Posts'

import { Error } from './Error'


interface iIteraction { 
    forum?:iForum
    recordings?:iRecordings 
    questions?:iPost[]
    submit(doubt:iDoubt):void
}

const posts:iPost[] = [{
    title:'Title', 
    detail:'Detail', 
    comments:['Test', 'Tost', 'Tust', 'Tast', 'Cast', 'Age']
}]

export const Iteraction = ({ forum, recordings, questions, submit }: iIteraction) => {

    return  forum ? <Forum {...forum} submit={submit}/>
        :   recordings ? <Recordings {...recordings}/>
        :   questions ?  <Posts posts={posts} submit={() => {}} reply={() => {}} like={() => {}}/>
    : <Error/>
}
