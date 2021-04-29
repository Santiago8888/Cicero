import { useState } from 'react'

export interface iLoginInput {email:string, password:string}
export interface iLogin { newUser:boolean, login(loginInput:iLoginInput):void }
export const Login = ({ newUser, login }: iLogin) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <div className="content">
        <div style={{display:'table', margin:'auto', minHeight:'calc(100vh - 120px - 6rem)', marginTop:'-3rem'}}>
            <div  style={{display:'table-cell', verticalAlign:'middle'}}>
                <h1 style={{fontSize:'3rem', marginBottom:'1rem', color:'darkblue'}}> ASTROCONSCIENCIA </h1>
                <h3
                    style={{
                        margin:'0rem auto 2rem',
                        color: '#333',
                        fontSize: '1.25em',
                        textAlign: 'center',
                        fontWeight: 500,
                        width: 600
                    }}
                >   {   newUser  ? 'Crear Usuario' : 'Iniciar Sesión' } </h3>

                <div className="field">
                    <input 
                        className="input" 
                        type="email" 
                        value={email} 
                        placeholder='Correo Electrónico'
                        style={{maxWidth:360}}
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

                <div className="field">
                    <input 
                        className="input" 
                        type="password" 
                        value={password} 
                        placeholder='Contraseña'
                        style={{maxWidth:360}}
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

                <div style={{ width:800, margin:'3rem auto 1rem', textAlign:'center'}}>
                    <button
                        className='button is-link' 
                        onClick={() => login({email, password})}
                        disabled={!email.match(/^\S+@\S+\.\S+$/) || password.length < 6}
                        style={{borderRadius:12, width:360, fontSize:'1.25rem', fontWeight:600, backgroundColor:'darkblue'}}
                    > CONTINUAR  </button>
                </div>
            </div>
        </div>
    </div>
}
