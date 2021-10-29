/* eslint-disable jsx-a11y/anchor-is-valid */

import { Elements } from '@stripe/react-stripe-js'
import { useMediaQuery } from 'react-responsive'
import { loadStripe } from '@stripe/stripe-js'
import ReactPlayer from 'react-player/youtube'
import { useEffect, useState } from "react"

import { iNewUser, SignUp } from './SignUp'
import { Billing } from './Billing'
import axios from 'axios'


interface iWelcome { click():void, reset():void }
const Welcome = ({ click, reset }:iWelcome) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })
    useEffect(() => { reset() }, [reset])

    return <div className="content" style={{textAlign:'center'}}>
        <h1 style={{fontSize:!smallScreen ? '3rem' : '2rem', marginBottom:0, color:'saddlebrown'}}> SATURNO </h1>

        <div style={{marginBottom:!smallScreen ? '2rem' : 0}}>
            {
                !smallScreen 
                    ?   <h2 style={{marginBottom:'1.5rem', marginRight:'auto', marginLeft:'auto', width:760, color:'saddlebrown'}}>
                            El maestro del Karma
                        </h2>
                    :   <h2 style={{marginBottom:'1.5rem', marginRight:'auto', marginLeft:'auto', color:'navy', fontSize:'1.25rem', marginTop:'1rem'}}>
                            Escucha el llamado de tu alma.
                        </h2>
            }
            <div>
                <ReactPlayer 
                    style={{margin:'auto'}}
                    width={midScreen ? 800 : !smallScreen ? 400 : 300 } 
                    height={midScreen ? 450 : !smallScreen ? 225 : 170 } 
                    url='https://www.youtube.com/watch?v=8u9sRggTos8' 
                />
            </div>
        </div>

        <div style={{marginTop:!smallScreen ? '2rem' : 0}}>
            {
                !smallScreen 
                    ?   <h2 style={{marginBottom:'0rem', marginRight:'auto', marginLeft:'auto', width:760, color:'saddlebrown'}}>
                            Descubre que es lo que has venido a enseñar
                        </h2>
                    :   <h2 style={{marginBottom:'1.5rem', marginRight:'auto', marginLeft:'auto', color:'navy', fontSize:'1.25rem', marginTop:'1rem'}}>
                            Escucha el llamado de tu alma.
                        </h2>
            }

            <a
                onClick={click}
                className='button is-link'
                style={{ 
                    width:!smallScreen ? 320 : 260 , 
                    fontSize: !smallScreen ? '1.5rem' : '1.25rem', 
                    fontWeight:900, 
                    marginTop:'1.25rem',
                    backgroundColor:'saddlebrown', 
                    borderRadius:20 
                }}
            > INICIA TU CAMNINO </a>
        </div>
    </div>
}


export interface iLanding { createUser(signUp:iNewUser):void }
interface ILanding extends iLanding { isWelcome:boolean, setWelcome():void }
export const Landing = ({ isWelcome, setWelcome, createUser}: ILanding) => {
    const [ newUser, setNewUser ] = useState<iNewUser>()
    const [ clientSecret, setClientSecret ] = useState<string>()
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE as string)

    const reset = () => { setNewUser(undefined) }
    const callStripe = async() => {
        setWelcome()
        const { data } = await axios.get('/.netlify/functions/payment-intent')
        setClientSecret(data)
    }

    return isWelcome
        ?   <Welcome click={callStripe} reset={reset} />
        :   <Elements stripe={stripePromise}>
                {
                    !newUser
                    ?   <SignUp signUp={setNewUser} />
                    :   <Billing newUser={newUser} createUser={createUser} clientSecret={clientSecret}/>        
                }
            </Elements>
}
