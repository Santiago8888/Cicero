import { Billing } from './Billing'
import { useState } from "react"
import { Login } from './Login'
import { User } from 'realm-web'

interface iWelcome { subscribe():void }
const Welcome = ({ subscribe }:iWelcome) => <div className="content">
    <h1> Astroconsciencia </h1>
    <iframe src={ "" } width="600" height="338" frameBorder="0" allowFullScreen/>
    <p> Encuentra el proposito de tu alma. </p>

    <a className='button' onClick={subscribe}> Inscribirte </a>
</div>


export const Landing = ({mongoUser}: {mongoUser?: User}) => {
    const [ subscribe, setSubscribe ] = useState(false)
    const [ isSignUp, setSignUp ] = useState(false)

    return subscribe
        ?   isSignUp    
            ?   <Login login={() => {}}/>
            :   <Billing mongoUser={mongoUser}/>   
        :   <Welcome subscribe={() => setSubscribe(true)}/>
    
}
