import { Recordings, iRecordings } from './Forum/Recordings'
import { Forum, iDoubt, iForum } from './Forum/Forum'

import { iPost } from '../App'
import { Error } from './Error'


interface iIteraction { 
    forum?:iForum
    recordings?:iRecordings 
    questions?:iPost[]
    submit(doubt:iDoubt):void
}

export const Iteraction = ({ forum, recordings, questions, submit }: iIteraction) => {

    return  forum ? <Forum {...forum} submit={submit}/>
        :   recordings ? <Recordings {...recordings}/>
        :   questions ?  <></>
    : <Error/>
}
