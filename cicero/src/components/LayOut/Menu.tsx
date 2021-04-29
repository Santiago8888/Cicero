/* eslint-disable jsx-a11y/anchor-is-valid */

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
        if(user.progress.module < id) return
        setActive(id===active ? user.current.module : id)
    }

    useEffect(() => { setActive(user?.current.module as number) },[user])

    return <aside 
        className="menu column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
        style={{ minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.15em' }}
    >
        <p className="menu-label"> Astroconsciencia </p>
        <ul className="menu-list">
            { modules.map(({ title, lessons }, idx) => 
                <li style={{lineHeight:2}}>
                    <a onClick={() => expand(idx)}> { title } </a>
                    {
                        active === idx || user?.current.module === idx ? <ul>
                            { lessons.map(({ title }, i) => 
                                <li style={{lineHeight:1.25}}>
                                    <a
                                        style={
                                            user?.current.lesson === i && user?.current.module === idx 
                                                ? {backgroundColor:'darkblue', borderRadius:8} 
                                                : {}
                                        }
                                        className={`${user?.current.lesson === i  && user?.current.module === idx ? 'is-active': ''}`}
                                        onClick={() => navigate({module:active, lesson:i})}
                                    > { title } </a>
                                </li>
                            )}
                        </ul> : null
                    }
                </li>
            )}
        </ul>
    </aside>
}
