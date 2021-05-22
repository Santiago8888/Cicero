/* eslint-disable jsx-a11y/anchor-is-valid */

import { iRecordings } from "../Forum/Recordings"
import { Planet } from "../Astral/AstralChart"
import { iQuestion } from "../Views/Quiz"
import { iForum } from "../Forum/Forum"
import { iPost } from "../Forum/Posts"
import { iUser } from '../../App'
import { useState } from "react"

type Lesson = 'Video' | 'Quiz' | 'Reading' | 'Chart'
export interface iLesson { 
    title:string, 
    type:Lesson, 
    description:string, 
    link?:string, 
    questions?:iQuestion[] 
    min?:number
    planets?:Planet[]
}


const Lock = () => <img 
    alt="lock-icon"
    style={{marginTop:-8, marginRight:10, height:24, verticalAlign:'middle'}}
    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lock-1967458-1668608.png" 
/>

export interface iPosition { unit:number, module:number, lesson:number }
export interface iModule { title:string, lessons:iLesson[] }
export interface iUnit { title:string, modules:iModule[] }
interface iMenu { 
    units:iUnit[]
    navigate(position:iPosition):void
    user?:iUser
    forum?:iForum
    recordings?:iRecordings 
    posts?:iPost[]
}


export const Menu = ({ units, navigate, user, forum, posts, recordings }: iMenu) => {
    const [active, setActive] = useState({ unit:user?.current.unit, module: user?.current.module})
    const [selectedUnit, setSelected ] = useState<number | undefined>()

    const expand = (unit:number, module:number) => {
        if(!user) return 
        if(user.progress.unit < unit) return
        if(user.progress.unit === unit && user.progress.module < module) return

        const isActiveClicked = active.unit === unit && active.module === module
        setActive(!isActiveClicked ? { module, unit } : { unit: undefined, module: undefined }) 
    }

    return <aside 
        className="menu column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
        style={{ minHeight:'calc(100vh - 85px)', width:250, boxShadow: '3px 0 3px 0 #ccc', fontSize:'1.15em' }}
    >
        {
            units.map(({ title, modules }, u) => <div style={{marginTop:16}} key={u}>
                { 
                    user && u <= user.progress.unit 
                    ? <a className="menu-label" onClick={() => setSelected(u !== selectedUnit ? u : undefined)}> { title } </a> 
                    : <p className="menu-label"> { title } </p> 
                }

                <ul className="menu-list">
                    { (user?.current.unit  === u || selectedUnit === u) && modules.map(({ title, lessons }, m) => 
                        <li style={{lineHeight:2}} key={m}>
                            <a 
                                onClick={() => expand(u, m)} 
                                style={!user || (user.progress.unit === u && user.progress.module < m) ? {cursor:'initial'} : {}}
                            >
                                { (!user || (user.progress.unit === u && user.progress.module < m)) && <Lock/> }
                                { title } 
                            </a>
                            {
                                (
                                    (u === active.unit && active.module === m) 
                                    || (user?.current.unit === u && user?.current.module === m) 
                                    || (!user && m === 0)
                                ) && lessons.length
                                ?   <ul>
                                        { lessons.map(({ title }, l) => 
                                            <li style={{lineHeight:1.25}} key={l}>
                                                <a
                                                    style={
                                                        user?.current.unit === u  
                                                        && user?.current.lesson === l
                                                        && user?.current.module === m 
                                                            ?   {
                                                                    backgroundColor: !forum && !recordings && !posts ? 'darkblue' : 'lightblue', 
                                                                    borderRadius:8
                                                                }
                                                            : !user || (
                                                                user?.progress.unit === u 
                                                                && m === user?.progress.module 
                                                                && l > user?.progress.lesson
                                                            ) 
                                                                ? {cursor:'initial'} 
                                                                : {}
                                                    }
                                                    className={
                                                        user?.current.unit === u  
                                                        && user?.current.lesson === l
                                                        && user?.current.module === m 
                                                        ? 'is-active': ''
                                                    }
                                                    onClick={() => navigate({unit:u, module:m, lesson:l})}
                                                > 
                                                    {   (
                                                            u === user?.progress.unit
                                                            && m === user?.progress.module 
                                                            && l > user?.progress.lesson
                                                        ) && <Lock/> 
                                                    }   { title }
                                                </a>
                                            </li>
                                        )}
                                    </ul> 
                                :   null
                            }
                        </li>
                    )}
                </ul>

            </div>)
        }
    </aside>
}
