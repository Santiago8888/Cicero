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
interface iMenu { modules:iModule[], current:number }
export const Menu = ({ modules, current }: iMenu) => {
    const [active, setActive] = useState(current)

    return <aside className="menu">
        {
            modules.map(({ title, lessons, locked }, idx) => 
                <>
                    <a className="menu-label" onClick={() => setActive(!locked ? idx : active)}> { title } </a>
                    <ul className="menu-list" style={{display: active ? 'initial' : 'none' }}>
                        {
                            lessons.map(({ title, type }) =>
                                <li>
                                    <a>
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
