/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { iLoginInput, Login } from './Login'
import Vimeo from '@u-wave/react-vimeo'
import { Billing } from './Billing'
import { useState } from "react"
import { User } from 'realm-web'
import { SignUp } from './SignUp'

interface iWelcome { subscribe():void }
const Welcome = ({ subscribe }:iWelcome) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <div className="content" style={{textAlign:'center'}}>
        <h1 style={{fontSize:!smallScreen ? '3rem' : '2rem', marginBottom:!smallScreen ? '2rem' : 0, color:'darkblue'}}> ASTROCONSCIENCIA </h1>
        <Vimeo video={'539430817'} width={midScreen ? 800 : !smallScreen ? 400 : 300 } height={midScreen ? 400 : !smallScreen ? 300 : 200 }/>

        <div style={{marginTop:!smallScreen ? '3rem' : 0}}>
            {
                !smallScreen 
                    ?   <h2 style={{marginBottom:'2rem', marginRight:'auto', marginLeft:'auto', width:600, color:'navy'}}>
                            Escucha el llamado de tu alma en las estrellas, los planetas y tu interior.
                        </h2>
                    :   <h2 style={{marginBottom:'1.5rem', marginRight:'auto', marginLeft:'auto', color:'navy', fontSize:'1.25rem', marginTop:'1rem'}}>
                            Escucha el llamado de tu alma.
                        </h2>
            }
            <a
                onClick={subscribe}
                className='button is-link'
                style={{ 
                    width:!smallScreen ? 460 : 260 , 
                    fontSize: !smallScreen ? '2rem' : '1.25rem', 
                    fontWeight:900, 
                    backgroundColor:'mediumblue', 
                    borderRadius:20 
                }}
            > INICIA TU CAMNINO </a>
        </div>
    </div>
}


export interface iLanding { mongoUser?: User, createUser(loginInput:iLoginInput):void }
interface ILanding extends iLanding { isWelcome:boolean, setWelcome():void }
export const Landing = ({mongoUser, isWelcome, setWelcome, createUser}: ILanding) => {
    const [ loginInput, setLoginInput ] = useState<iLoginInput>()

    return isWelcome
        ?   <Welcome subscribe={setWelcome}/>
        :   !loginInput
            ?   <SignUp login={(loginInput) => setLoginInput(loginInput)} />
            :   <Billing mongoUser={mongoUser} loginInput={loginInput} createUser={createUser}/>
}
