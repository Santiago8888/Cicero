import { iQuestion } from "../Views/Quiz"

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
interface iMenu { modules:iModule[] }

export const Menu = ({ modules }: iMenu) => <aside className="menu">
    {
        modules.map(({ title, lessons }) => 
            <>
                <p className="menu-label"> { title } </p>
                <ul className="menu-list">
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
