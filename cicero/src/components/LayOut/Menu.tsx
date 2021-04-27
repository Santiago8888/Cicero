import { iQuestion } from "../Views/Quiz"
import { useState } from "react"
import { iUser } from '../../App'

type Lesson = 'Video' | 'Quiz' | 'Reading'
export interface iLesson { 
    title:string, 
    type:Lesson, 
    description:string, 
    link?:string, 
    questions?:iQuestion[] 
}

export interface iPosition {module:number, lesson:number}
export interface iModule { title:string, lessons:iLesson[] }
interface iMenu { modules:iModule[], current:iPosition, navigate(position:iPosition):void, user:iUser }
export const Menu = ({ modules, current, navigate, user }: iMenu) => {
    const [active, setActive] = useState(current.module)
    const expand = (id:number) => {
        if(user.progress.module > id) return
        setActive(id)
    }

    return <aside className="menu">
        {
            modules.map(({ title, lessons }, idx) => 
                <>
                    <a className="menu-label"   onClick={() => expand(idx)}> { title } </a>
                    <ul className="menu-list" style={{display: active ? 'initial' : 'none' }}>
                        {
                            lessons.map(({ title, type }, i) =>
                                <li 
                                    key={i} 
                                    style={active===idx && current.lesson === i ? {background:'blue',color:'white'} : {}}
                                >
                                    <a onClick={() => navigate({module:active, lesson:i})}>
                                        <strong> {type}: </strong> 
                                        { title } 
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                </>
            )
        }
    </aside>
}
