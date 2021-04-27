
import { iLesson, Menu } from './components/LayOut/Menu'
import { NavBar } from './components/LayOut/NavBar'
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


    return <div className="App">
        <NavBar />
        <Menu modules={[]}/>
        <Home {...data} isAuth={isAuth} isLogin={isLogin}/>
    </div>
}
