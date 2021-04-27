import { useState } from 'react'

interface iLogin { submit(email:string, password:string):void }
export const Login = ({ submit }: iLogin) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return <div className="content">
        <div className="field">
            <label className="label"> Correo Electrónico: </label>

            <div className="control">
                <input 
                    className="input" 
                    type="email" 
                    value={email} 
                    onChange={({target:{value}})=> setEmail(value)}
                />
            </div>
        </div>

        <div className="field">
            <label className="label"> Contraseña: </label>    
            <div className="control">
            <input 
                    className="input" 
                    type="password" 
                    value={password} 
                    onChange={({target:{value}})=> setPassword(value)}
                />
            </div>
        </div>

        <button className='button' onClick={() => submit(email, password)}> 
            Siguiente 
        </button>
    </div>
}
