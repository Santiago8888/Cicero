import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'

export interface iLoginInput {email:string, password:string}
export interface iLogin { login(loginInput:iLoginInput):void }
export const Login = ({ login }: iLogin) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    return <div className='content'>
        <div style={{display:'table', margin:'auto', minHeight:'calc(100vh - 120px - 6rem)', marginTop:'-3rem'}}>
            <div  style={{display:'table-cell', verticalAlign:'middle'}}>
                <h1 style={{fontSize:!smallScreen ? '3rem' : '2rem', marginBottom:'1rem', color:'saddlebrown'}}> 
                    SATURNO 🪐  
                </h1>

                <h3
                    style={{
                        margin:'0rem auto 2rem',
                        color: '#333',
                        fontSize: !smallScreen ? '1.25em' : '1rem',
                        textAlign: 'center',
                        fontWeight: 500,
                        width: !smallScreen ? 600 : 300
                    }}
                >   Curso en línea </h3>

                <div className='field'>
                    <input 
                        className='input' 
                        type='email' 
                        value={email} 
                        placeholder='Correo Electrónico'
                        style={{width: !smallScreen ? 360 : 240}}
                        onKeyPress={({ key }) => 
                            key === 'Enter' 
                            && email.match(/^\S+@\S+\.\S+$/) 
                            && password.length >= 6 
                                ? login({email, password}) 
                                : null
                        }
                        onChange={({target:{value}})=> setEmail(value)}
                    />
                </div>

                <div className='field'>
                    <input 
                        className='input' 
                        type='password' 
                        value={password} 
                        placeholder='Contraseña'
                        style={{width: !smallScreen ? 360 : 240}}
                        onKeyPress={({ key }) => 
                            key === 'Enter' 
                            && email.match(/^\S+@\S+\.\S+$/) 
                            && password.length >= 6 
                                ? login({email, password}) 
                                : null
                        }
                        onChange={({target:{value}})=> setPassword(value)}
                    />
                </div>

                <div style={{ width: !smallScreen ? 600 : 300, margin:'3rem auto 1rem', textAlign:'center'}}>
                    <button
                        className='button is-link' 
                        onClick={() => login({email, password})}
                        disabled={!email.match(/^\S+@\S+\.\S+$/) || password.length < 6}
                        style={{
                            borderRadius:12, 
                            width: !smallScreen ? 360 : 240, 
                            fontSize: !smallScreen ? '1.25rem' : '1rem', 
                            fontWeight: 600, 
                            backgroundColor:'saddlebrown'
                        }}
                    > Iniciar Sesión </button>
                </div>
            </div>
        </div>
    </div>
}
