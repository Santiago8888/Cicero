/* eslint-disable jsx-a11y/anchor-is-valid */

import { iRecordings } from "../Forum/Recordings"
import { useEffect, useState } from "react"
import { iQuestion } from "../Views/Quiz"
import { iForum } from "../Forum/Forum"
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


const Lock = () => <img 
    alt="lock-icon"
    style={{marginTop:-8, marginRight:10, height:24, verticalAlign:'middle'}}
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lock-1967458-1668608.png" 
/>

export interface iPosition { module:number, lesson:number }
export interface iModule { title:string, lessons:iLesson[] }
interface iMenu { modules:iModule[], navigate(position:iPosition):void, user?:iUser, forum?:iForum, recordings?:iRecordings }
export const Menu = ({ modules, navigate, user, forum, recordings }: iMenu) => {
    const [active, setActive] = useState<number>(user?.current.module || 0)

    const expand = (id:number) => {
        if(!user) return 
        if(user.progress.module < id) return
        setActive( id === active ? user.current.module : id)
    }

    useEffect(() => { setActive(user?.current.module as number) },[user])

    return <aside 
        className="menu column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
        style={{ minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.15em' }}
    >
        <p className="menu-label"> Astroconsciencia </p>
        <ul className="menu-list">
            { modules.map(({ title, lessons }, idx) => 
                <li style={{lineHeight:2}} key={idx}>
                    <a onClick={() => expand(idx)} style={!user ? {cursor:'initial'} : {}}>
                        { (!user || user.progress.module < idx) && <Lock/> }
                        { title } 
                    </a>
                    {
                        active === idx || user?.current.module === idx || (!user && idx === 0) ? <ul>
                            { lessons.map(({ title }, i) => 
                                <li style={{lineHeight:1.25}} key={i}>
                                    <a
                                        style={
                                            user?.current.lesson === i && user?.current.module === idx 
                                                ? {backgroundColor: !forum && !recordings ? 'darkblue' : 'lightblue', borderRadius:8} 
                                                : !user || (idx === user?.progress.module && i > user?.progress.lesson) ? {cursor:'initial'} : {}
                                        }
                                        className={`${user?.current.lesson === i  && user?.current.module === idx ? 'is-active': ''}`}
                                        onClick={() => navigate({module:active, lesson:i})}
                                    > 
                                        { (idx === user?.progress.module && i > user?.progress.lesson) && <Lock/> }
                                        { title } 
                                    </a>
                                </li>
                            )}
                        </ul> : null
                    }
                </li>
            )}
        </ul>
    </aside>
}
