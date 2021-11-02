import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from 'react-responsive'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

import { iNatalChart } from '../../App'


export interface iNewUser {name:string, email:string, password:string, date:Date, location:string, natalChart?:iNatalChart }
export interface iSignUp { signUp(newUser:iNewUser):void }
export const SignUp = ({ signUp }: iSignUp) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState<Date>()
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')

    const keyPress = ({key}:{key:string}) => key === 'Enter' 
        && location && date && name && email.match(/^\S+@\S+\.\S+$/)  && password.length >= 6 
            ? signUp({name, email, password, date, location}) : null

    return <div className='content'>
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

                <div className='field' style={{marginTop:'1.75rem'}}>
                    <input 
                        type='text' 
                        value={name} 
                        maxLength={16}
                        className='input' 
                        onKeyPress={keyPress}
                        placeholder={'Nombre'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setName(value)}
                    />
                </div>

                <div className='field' style={{marginTop:'1.75rem'}}>
                    <input 
                        type='email' 
                        value={email} 
                        className='input' 
                        onKeyPress={keyPress}
                        placeholder={'Correo Electrónico'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setEmail(value)}
                    />
                </div>

                <div className='field' style={{marginTop:'1.75rem', marginBottom:0}}>
                    <input 
                        type='password' 
                        value={password} 
                        className='input' 
                        onKeyPress={keyPress}
                        placeholder={'Contraseña'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setPassword(value)}
                    />
                </div>

                <DatePicker
                    className='input'
                    showTimeInput
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode='select'
                    selected={date}
                    maxDate={new Date()}
                    yearDropdownItemNumber={15}
                    timeInputLabel='Time:'
                    yearItemNumber={130}
                    shouldCloseOnSelect={false}
                    dateFormat='MM/dd/yyyy h:mm aa'
                    onChange={date => setDate(date as Date)}
                    placeholderText={'Fecha y Hora de Nacimiento'}
                />                

                <div className='field' style={{marginTop:'1.75rem', marginBottom:0}}>
                    <input 
                        type='text' 
                        value={location} 
                        className='input' 
                        onKeyPress={keyPress}
                        placeholder={'Ciudad y País de Nacimiento'}
                        style={{width: !smallScreen ? 360 : 240}}
                        onChange={({target:{value}})=> setLocation(value)}
                    />
                </div>

                <div style={{ width: !smallScreen ? 600 : 300, margin:'3rem auto 1rem', textAlign:'center'}}>
                    <button
                        className='button is-link' 
                        onClick={() => date && signUp({name, email, password, date, location})}
                        disabled={!name || !email.match(/^\S+@\S+\.\S+$/) || password.length < 6 || !date || !location}
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
