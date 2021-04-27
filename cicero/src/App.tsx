import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iLesson, Menu } from './components/LayOut/Menu'
import { iLoginInput } from './components/Auth/Login'
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

const data = {
    forum:undefined,
    recordings:undefined,
    lesson
}

export const App = () => {
    const [isAuth, setAuth] = useState(false)
    const [isLogin, setLogin] = useState(false)

    const clickNavbar = (item:NavbarItem) => {
        if(item === 'Forum') return
        if(item === 'Login') setLogin(true)
        if(item === 'Recordings') return
    }
    
    const login = ({ email, password }:iLoginInput) => {
        console.log(email, password)
        setAuth(true)
        setLogin(true)
    }


    return <div className="App">
        <NavBar click={(item) => clickNavbar(item)}/>
        <Menu modules={[]}/>
        <Home {...data} isAuth={isAuth} isLogin={isLogin} login={login}/>
    </div>
}
