import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'

export interface iLoginInput {email:string, password:string}
export interface iSignUp { login(loginInput:iLoginInput):void }
export const SignUp = ({ login }: iSignUp) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const keyPress = ({key}:{key:string}) => key === 'Enter' 
        && name
        && email.match(/^\S+@\S+\.\S+$/) 
        && password.length >= 6 
            ? login({email, password}) 
            : null

    return <div className="content">
        <div style={{display:'table', margin:'auto', minHeight:'calc(100vh - 120px - 6rem)', marginTop:'-3rem'}}>
            <div  style={{display:'table-cell', verticalAlign:'middle'}}>
                <h1 style={{fontSize:!smallScreen ? '3rem' : '2rem', marginBottom:'1rem', color:'darkblue'}}> 
                    ASTROCONSCIENCIA 
                </h1>

                <h3
                    style={{
                        color: '#333',
                        fontWeight: 500,
                        textAlign: 'center',
                        margin:'0rem auto 3rem',
                        width: !smallScreen ? 600 : 300,
                        fontSize: !smallScreen ? '1.25em' : '1rem'
                    }}
                >  Curso en línea </h3>

                <div className="field" style={{marginTop:'1.75rem'}}>
                    <input 
                        type="text" 
                        value={name} 
                        maxLength={16}
                        className="input" 
                        onKeyPress={keyPress}
                        placeholder={'Nombre'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setName(value)}
                    />
                </div>

                <div className="field" style={{marginTop:'1.75rem'}}>
                    <input 
                        type="email" 
                        value={email} 
                        className="input" 
                        onKeyPress={keyPress}
                        placeholder={'Correo Electrónico'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setEmail(value)}
                    />
                </div>

                <div className="field" style={{marginTop:'1.75rem'}}>
                    <input 
                        type="password" 
                        value={password} 
                        className="input" 
                        onKeyPress={keyPress}
                        placeholder={'Contraseña'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setPassword(value)}
                    />
                </div>

                <div style={{ width: !smallScreen ? 600 : 300, margin:'3rem auto 1rem', textAlign:'center'}}>
                    <button
                        className='button is-link' 
                        onClick={() => login({email, password})}
                        disabled={!name || !email.match(/^\S+@\S+\.\S+$/) || password.length < 6}
                        style={{
                            borderRadius:12, 
                            width: !smallScreen ? 360 : 240, 
                            fontSize: !smallScreen ? '1.25rem' : '1rem', 
                            fontWeight: 600, 
                            backgroundColor:'darkblue'
                        }}
                    > Crear Usuario </button>
                </div>
            </div>
        </div>
    </div>
}
