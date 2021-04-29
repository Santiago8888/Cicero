import { iLoginInput, Login } from './Login'
import Vimeo from '@u-wave/react-vimeo'
import { Billing } from './Billing'
import { useState } from "react"
import { User } from 'realm-web'

interface iWelcome { subscribe():void }
const Welcome = ({ subscribe }:iWelcome) => <div className="content" style={{textAlign:'center'}}>
    <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> ASTROCONSCIENCIA </h1>

    <Vimeo video={'539430817'} width={800} height={400}/>

    <div style={{marginTop:'3rem'}}>
        <h2 style={{marginBottom:'2rem', marginRight:'auto', marginLeft:'auto', width:600, color:'navy'}}> 
            Escucha el llamado de tu alma en las estrellas, los planetas y tu interior. 
        </h2>
        <a 
            onClick={subscribe} 
            className='button is-link' 
            style={{ width:460, fontSize: '2rem', fontWeight:900, backgroundColor:'mediumblue', borderRadius:20 }}
        > INICIA TU CAMNINO </a>
    </div>
</div>


export interface iLanding {mongoUser?: User, db:Realm.Services.MongoDBDatabase}
export const Landing = ({mongoUser, db}: iLanding) => {
    const [ subscribe, setSubscribe ] = useState(false)
    const [ loginInput, setLoginInput ] = useState<iLoginInput>()

    return subscribe
        ?   !loginInput    
            ?   <Login login={(loginInput) => setLoginInput(loginInput)} newUser={true}/>
            :   <Billing mongoUser={mongoUser} db={db} loginInput={loginInput}/>   
        :   <Welcome subscribe={() => setSubscribe(true)}/>
}
