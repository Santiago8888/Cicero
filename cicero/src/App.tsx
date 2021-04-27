import { iLesson, iModule, Menu, iPosition } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iLoginInput } from './components/Auth/Login'
import { iForum } from './components/Forum/Forum'
import { Home } from './components/Home'

import { useState } from 'react'

import 'bulma/css/bulma.css'
import './App.css'

export interface iUser { email:string, progress:iPosition, quizFailures:number }
const lesson: iLesson = { title:'', description:'', type:'Video' }
const forum:iForum = { title:'', description:'', questions:[] }
const recordings:iRecordings = { title:'', description:'', recordings:[] }

const modules:iModule[] = [
    { title:'Modulo 1', lessons:[{title:'', type:'Video', description:'', link:''}]},
    { title:'Módulo 2', lessons:[{title:'', type:'Reading', description:'', link:''}]},
    { title:'Módulo 3', lessons:[{title:'', type:'Quiz', description:'', questions:[{question:'', answers:[], index:0}]}]},
    { title:'Módulo 4', lessons:[{title:'', type:'Video', description:'', link:''}]},
    { title:'Módulo 5', lessons:[{title:'', type:'Video', description:'', link:''}]},
    { title:'Módulo 6', lessons:[{title:'', type:'Video', description:'', link:''}]}
]

interface iHomeData { forum?:iForum, recordings?:iRecordings, lesson:iLesson}
const initialData:iHomeData = { forum:undefined, recordings:undefined, lesson }
const defaultUser:iUser = { email:'test@branding.gq', progress:{module:0, lesson:0}, quizFailures:0 }
export const App = () => {
    const [isAuth, setAuth] = useState(false)
    const [isLogin, setLogin] = useState(false)
    const [homeData, setHomeData] = useState<iHomeData>(initialData)
    const [current, setCurrent] = useState({module:0, lesson:0})
    const [user, setUser] = useState<iUser>(defaultUser)


    const clickNavbar = (item:NavbarItem) => {
        if(item === 'Forum') return setHomeData({...homeData, forum, recordings:undefined})
        if(item === 'Login') return setLogin(true)
        if(item === 'Recordings') return setHomeData({...homeData, forum:undefined, recordings})
    }
    
    const login = ({ email, password }:iLoginInput) => {
        console.log(email, password)
        setAuth(true)
        setLogin(true)
    }

    const next = () => {
        if (modules[current.module].lessons[current.lesson+1]) {
            const newPosition = { module:current.module, lesson:current.lesson+1 }
            setCurrent(newPosition)
            setUser({...user, progress:newPosition})

        } else if (modules[current.module + 1]) {
            const newPosition = { module:current.module+1, lesson:0 }
            setCurrent(newPosition)
            setUser({...user, progress:newPosition})

        } else alert('Congratulations')
    }

    const navigate = ({module, lesson}:iPosition) => {
        if(module > user.progress.module) return
        if(lesson > user.progress.lesson) return

        setCurrent({ module, lesson })
    }

    return <div className="App">
        <NavBar click={(item) => clickNavbar(item)}/>
        <Menu modules={modules} current={current} navigate={navigate} user={user}/>
        <Home {...homeData} isAuth={isAuth} isLogin={isLogin} login={login} next={next}/>
    </div>
}
