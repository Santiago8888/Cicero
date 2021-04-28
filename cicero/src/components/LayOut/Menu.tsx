import { useEffect, useState } from "react"
import { iQuestion } from "../Views/Quiz"
import { iUser } from '../../App'

type Lesson = 'Video' | 'Quiz' | 'Reading'
export interface iLesson { 
    title:string, 
    type:Lesson, 
    description:string, 
    link?:string, 
    questions?:iQuestion[] 
    min?:number
}

export interface iPosition {module:number, lesson:number}
export interface iModule { title:string, lessons:iLesson[] }
interface iMenu { modules:iModule[], navigate(position:iPosition):void, user?:iUser }
export const Menu = ({ modules, navigate, user }: iMenu) => {
    const [active, setActive] = useState<number>(user?.current.module || 0)

    const expand = (id:number) => {
        if(!user) return 
        if(user.progress.module > id) return
        setActive(id)
    }

    useEffect(() => { setActive(user?.current.module as number) },[user])

    return <aside 
        className="menu column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
        style={{ minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.25rem' }}
    >
        <ul className="menu-list" style={{lineHeight:2}}>
            {
                modules.map(({ title, lessons }, idx) => 
                    <li><a onClick={() => expand(idx)}> { title } </a></li>
                        /*
                            idx === active && lessons.map(({ title, type }, i) =>
                                <li 
                                    key={i} 
                                    style={active===idx && user?.current.lesson === i ? {background:'blue',color:'white'} : {}}
                                >
                                    <a onClick={() => active ? navigate({module:active, lesson:i}) : null}>
                                        <strong> {type}: </strong> 
                                        { title } 
                                    </a>
                                </li>
                            )
                        */                        
                    
                )
            }
        </ul>
    </aside>
}
