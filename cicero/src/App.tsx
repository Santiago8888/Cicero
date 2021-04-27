import { iLesson, iModule, Menu } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iLoginInput } from './components/Auth/Login'
import { iForum } from './components/Forum/Forum'
import { Home } from './components/Home'
import { useState } from 'react'

import 'bulma/css/bulma.css'
import './App.css'


const lesson: iLesson = {
    title:'',
    description:'',
    type:'Video',
    locked:false    
}

const forum:iForum = {
    title:'',
    description:'',
    questions:[]    
}

const recordings:iRecordings = {
    title:'',
    description:'',
    recordings:[]
}

const Modules:iModule[] = [
    { title:'Modulo 1', locked:false, lessons:[]},
    { title:'Módulo 2', locked:true, lessons:[]},
    { title:'Módulo 3', locked:false, lessons:[]},
    { title:'Módulo 4', locked:false, lessons:[]},
    { title:'Módulo 5', locked:false, lessons:[]},
    { title:'Módulo 6', locked:false, lessons:[]}
]

interface iHomeData { forum?:iForum, recordings?:iRecordings, lesson:iLesson}
const initialData:iHomeData = { forum:undefined, recordings:undefined, lesson }
export const App = () => {
    const [isAuth, setAuth] = useState(false)
    const [isLogin, setLogin] = useState(false)
    const [homeData, setHomeData] = useState<iHomeData>(initialData)
    const [modules, setModules] = useState(Modules)

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


    return <div className="App">
        <NavBar click={(item) => clickNavbar(item)}/>
        <Menu modules={modules} current={0}/>
        <Home {...homeData} isAuth={isAuth} isLogin={isLogin} login={login}/>
    </div>
}
