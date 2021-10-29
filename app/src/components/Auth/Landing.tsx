/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/youtube'

import { iNewUser } from './SignUp'


interface iWelcome { click():void }
const Welcome = ({ click, }:iWelcome) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <div className="content" style={{textAlign:'center'}}>
        <h1 style={{fontSize:!smallScreen ? '3rem' : '2rem', marginBottom:0, color:'saddlebrown'}}> SATURNO 🪐  </h1>

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
                    url='https://youtu.be/-AEpq9zauQ8' 
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
interface ILanding { setLogin():void }
export const Landing = ({ setLogin }:ILanding) => <Welcome click={setLogin} />
