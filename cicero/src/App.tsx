
import { NavBar } from './components/LayOut/NavBar'
import { Menu } from './components/LayOut/Menu'
import { Home } from './components/Home'

import 'bulma/css/bulma.css'
import './App.css'

const App = () => <div className="App">
    <NavBar />
    <Menu modules={[]}/>
    <Home />
</div>


export default App
