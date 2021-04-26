
type Lesson = 'Video' | 'Actividad' | 'Quiz' | 'Lectura'
interface iLesson { name:string, type:Lesson, locked:boolean }
interface iModule { name:string, locked:boolean, lessons:iLesson[] }
interface iMenu { modules:iModule[] }

export const Menu = ({ modules }: iMenu) => <aside className="menu">
    {
        modules.map(({ name, lessons }) => 
            <>
                <p className="menu-label"> { name } </p>
                <ul className="menu-list">
                    {
                        lessons.map(({ name, type }) =>
                                <li>
                                    <a>
                                        <strong> {type}: </strong> 
                                        { name } 
                                    </a>
                                </li>
                        )
                    }
                </ul>
            </>
        )
    }
</aside>
