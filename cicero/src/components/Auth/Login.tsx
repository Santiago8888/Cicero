import { useState } from 'react'

export interface iLoginInput {email:string, password:string}
export interface iLogin { newUser:boolean, login(loginInput:iLoginInput):void }
export const Login = ({ newUser, login }: iLogin) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> ASTROCONSCIENCIA </h1>
        <h3 
            style={{
                margin:'0rem auto 2rem',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: 600        
            }}
        > 
            {
                !newUser 
                ? 'Bienvdenid@ de vuelta, ingresa tu correo electrónico para acceder al curso.' 
                : 'Para acceder al curso, por favor crea un usuario.'
            }
        </h3>

        <div className="field is-horizontal" style={{maxWidth:570, marginLeft:'auto', marginRight:'auto'}}>
            <div className="field-label is-normal" style={{maxWidth:180}}>
                <label className="label"> Correo Electrónico: </label>
            </div>

            <div className="field-body" style={{textAlign:'left', maxWidth:390}}>
                <div className="field">
                    <input 
                        className="input" 
                        type="email" 
                        value={email} 
                        style={{maxWidth:300}}
                        onChange={({target:{value}})=> setEmail(value)}
                    />
                </div>
            </div>
        </div>

        <div className="field is-horizontal" style={{maxWidth:570, marginLeft:'auto', marginRight:'auto'}}>
            <div className="field-label is-normal" style={{maxWidth:180}}>
                <label className="label"> Contraseña: </label>
            </div>

            <div className="field-body" style={{textAlign:'left', maxWidth:390}}>
                <div className="field">
                    <input 
                        className="input" 
                        type="password" 
                        value={password} 
                        style={{maxWidth:300}}
                        onChange={({target:{value}})=> setPassword(value)}
                    />
                </div>
            </div>
        </div>

        <div style={{ width:800, margin:'3rem auto 1rem', textAlign:'center'}}>
            <a 
                onClick={() => login({email, password})}
                className='button is-link' 
                style={{borderRadius:12, width:360, fontSize:'1.25rem', fontWeight:600, backgroundColor:'darkblue'}}
            > CONTINUAR  </a>
        </div>
    </div>
}
