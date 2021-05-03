import { iLoginInput, Login } from './Login'
import { Billing } from './Billing'
import { useState } from "react"
import { User } from 'realm-web'

interface iWelcome { subscribe():void }
const Welcome = ({ subscribe }:iWelcome) => <div className="content">
    <h1> Astroconsciencia </h1>
    <iframe src={ "" } width="600" height="338" frameBorder="0" allowFullScreen/>
    <p> Encuentra el proposito de tu alma. </p>

    <a className='button' onClick={subscribe}> Inscribirte </a>
</div>


export interface iLanding {mongoUser?: User, db:Realm.Services.MongoDBDatabase}
export const Landing = ({mongoUser, db}: iLanding) => {
    const [ subscribe, setSubscribe ] = useState(false)
    const [ loginInput, setLoginInput ] = useState<iLoginInput>()

    return subscribe
        ?   !loginInput    
            ?   <Login login={(loginInput) => setLoginInput(loginInput)}/>
            :   <Billing mongoUser={mongoUser} db={db} loginInput={loginInput}/>   
        :   <Welcome subscribe={() => setSubscribe(true)}/>
}
