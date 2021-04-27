import { useEffect } from "react"
import { iUser } from '../../App'

const defaultDoc = ''

interface iDocument { 
    user:iUser
    title:string
    link?:string
    description:string
    min?:number
    next():void
    approve():boolean | void 
}


export const Document = ({ user, title, link=defaultDoc, description, min, next, approve }:iDocument) => {
    useEffect(() => { setTimeout(() => approve(), 1000*(min||10)) }, [])

    return <div className="content">
        <h1> { title } </h1>
        <p> { description } </p>

        <a target='_blank' rel='noreferrer' href={link} style={{padding:0}} className='button'>
            Leer
        </a>

        <a 
            className='button' 
            onClick={next}
            hidden={user.current.module > user.progress.module && user.progress.lesson > user.current.lesson}
        > Siguiente </a>
    </div>
}
