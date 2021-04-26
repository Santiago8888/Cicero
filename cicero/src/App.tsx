
import { NavBar } from './components/LayOut/NavBar'
import { iLesson, Menu } from './components/LayOut/Menu'
import { Home } from './components/Home'

import 'bulma/css/bulma.css'
import './App.css'
import { useState } from 'react'


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

    return <div className="App">
        <NavBar />
        <Menu modules={[]}/>
        <Home {...data} isAuth={isAuth}/>
    </div>
}
