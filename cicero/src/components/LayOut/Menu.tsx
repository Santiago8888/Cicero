import { iQuestion } from "../Views/Quiz"
import { useState } from "react"


type Lesson = 'Video' | 'Quiz' | 'Reading'
export interface iLesson { 
    title:string, 
    type:Lesson, 
    locked:boolean, 
    description:string, 
    link?:string, 
    questions?:iQuestion[] 
}

interface iPosition {module:number, lesson:number | undefined}
export interface iModule { title:string, locked:boolean, lessons:iLesson[] }
interface iMenu { modules:iModule[], current:iPosition, navigate(position:iPosition):void }
export const Menu = ({ modules, current, navigate }: iMenu) => {
    const [active, setActive] = useState(current.module)
    const expand = (moduleId:number, locked:boolean) => {
        if(locked) return
        setActive(moduleId)
    }

    return <aside className="menu">
        {
            modules.map(({ title, lessons, locked }, idx) => 
                <>
                    <a className="menu-label"   onClick={() => expand(idx, locked)}> { title } </a>
                    <ul className="menu-list" style={{display: active ? 'initial' : 'none' }}>
                        {
                            lessons.map(({ title, type, locked }, i) =>
                                <li 
                                    key={i} 
                                    style={active===idx && current.lesson === i ? {background:'blue',color:'white'} : {}}
                                >
                                    <a onClick={() => !locked ? navigate({module:active, lesson:i}) : null}>
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
