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

export interface iModule { title:string, locked:boolean, lessons:iLesson[] }
interface iMenu { modules:iModule[], current:{module:number, lesson:number | undefined} }
export const Menu = ({ modules, current }: iMenu) => {
    const [active, setActive] = useState(current)

    return <aside className="menu">
        {
            modules.map(({ title, lessons, locked }, idx) => 
                <>
                    <a 
                        className="menu-label" 
                        onClick={() => 
                            !locked && idx !==  active.module 
                                ?   setActive({module:idx, lesson:undefined}) 
                                :   null
                        }
                    > { title } </a>
                    <ul className="menu-list" style={{display: active ? 'initial' : 'none' }}>
                        {
                            lessons.map(({ title, type, locked }, i) =>
                                <li style={{background:current.lesson===i?'blue':'white'}} key={i}>
                                    <a onClick={() => !locked ? setActive({...active, lesson:i}) : null}>
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
