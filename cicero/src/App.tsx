import { iLesson, iModule, Menu, iPosition } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iLoginInput } from './components/Auth/Login'
import { iForum } from './components/Forum/Forum'
import { Home } from './components/Home'

import { useState, useEffect } from 'react'

import 'bulma/css/bulma.css'
import './App.css'

export interface iUser { email:string, progress:iPosition, quizFailures:number, current:iPosition }
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
const initialPosition = {module:0, lesson:0}
const defaultUser:iUser = { email:'test@branding.gq', progress:initialPosition, current:initialPosition, quizFailures:0 }
export const App = () => {
    const [isAuth, setAuth] = useState(false)
    const [isLogin, setLogin] = useState(false)
    const [homeData, setHomeData] = useState<iHomeData>(initialData)
    const [user, setUser] = useState<iUser>(defaultUser)

    useEffect(() => { 
        setHomeData({...homeData, lesson:modules[user.current.module].lessons[user.current.lesson]}) 
    }, [user.current])

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


    const nextLesson = ({module, lesson}:iPosition) => {
        if (modules[module].lessons[lesson+1]) return { module:module, lesson:lesson+1 }
        else if (modules[user.current.module + 1]) return { module: module+1, lesson:0 }
        else return { module, lesson }
    }

    const next = () => {
        if(lesson.type === 'Quiz'){
            if(user.quizFailures === 0) return setUser({...user, current:nextLesson(user.current)})
            if(user.quizFailures === 1) return
            if(user.quizFailures === 2) setUser({
                ...user, 
                quizFailures:0, 
                progress:{...user.current, lesson:0}, 
                current: {...user.current, lesson:0}
            })

        } else return setUser({...user, current:nextLesson(user.current)})
    }

    const navigate = ({module, lesson}:iPosition) => {
        if(module > user.progress.module) return
        if(lesson > user.progress.lesson) return

        setUser({...user, current:{ module, lesson } })
    }

    const approveQuiz = (score:number) => {
        if(!lesson.questions?.length) return false 

        const minScore = lesson.min || lesson.questions.length*.7
        const isPassing = user.progress.lesson === user.current.lesson && user.progress.module === user.current.module

        if(isPassing && score >= minScore) setUser({...user, progress:nextLesson(user.progress), quizFailures:0})
        else if(isPassing && user.quizFailures > 1) setUser({...user, quizFailures:2 })
        else if(isPassing) setUser({...user, quizFailures:1})
        
        if(score >= minScore) return true
        else return false
    }

    const approve = (score?:number) => {
        if(lesson.type === 'Quiz' && score) return approveQuiz(score)
        return setUser({...user, progress:nextLesson(user.progress)})
    }

    return <div className="App">
        <NavBar click={(item) => clickNavbar(item)}/>
        <Menu modules={modules} navigate={navigate} user={user}/>

        <Home 
            {...homeData} 
            isAuth={isAuth} 
            isLogin={isLogin} 
            login={login} 
            next={next} 
            approve={approve} 
            user={user}
        />
    </div>
}
