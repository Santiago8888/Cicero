/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { iUser } from '../../App'


const tabStyle:CSSProperties = { fontSize: '1.2em', backgroundColor:'darkolivegreen' }
const navTextStyle:CSSProperties = {textAlign:'center', color:'white', backgroundColor:'darkolivegreen'}

export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home' | 'Posts'
interface iNavBar { user?:iUser, click(item:NavbarItem):void }

export const NavBar = ({ click, user }: iNavBar) => {
    const midScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [ isActive, setActive ] = useState(false)

    return <nav 
        className='navbar is-link' 
        role='navigation' 
        aria-label='main navigation' 
        style={{borderBottom: '2px solid #ccc', backgroundColor:'darkolivegreen', padding:'0px 2.5rem'}}
    >
        <div 
            className='container' 
            style={{maxWidth:2000, paddingLeft:midScreen ? '2.5rem' : 0, paddingRight:midScreen ? '3em' : 0 }}
        >
            <div className='navbar-brand'>
                <a className='navbar-item' onClick={() => click('Home')} style={{backgroundColor:'darkolivegreen'}}>
                    <img 
                        src='planets/Saturn_terra.png' 
                        style={{ height:56, maxHeight:'none', background:'white', borderRadius:'50%', padding:6}} 
                        alt={'Saturn logo'}
                    />
                    <p className='navbar-item' style={{ fontSize: '2em', color:'white', marginLeft:24 }} > 
                        { midScreen ? 'Manejo y Liberación del Karma' : 'Saturno' } 
                    </p>
                </a>

                <a 
                    role='button' 
                    className={`navbar-burger ${isActive ? 'is-active': ''}`}
                    style={{ marginTop:'auto', marginBottom: 'auto'}}
                    aria-label='menu' 
                    aria-expanded='false' 
                    data-target='navbarBasicExample'
                    onClick={()=> setActive(!isActive)}
                >
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>

            <div 
                className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} 
                style={{ marginRight:'auto', backgroundColor:'darkolivegreen' }}
            >
                { 
                    !user && <div className={`navbar-end`} style={tabStyle} >
                        <a 
                            onClick={() => click('Login')} 
                            className={'navbar-item'} 
                            style={navTextStyle}
                        > 
                            <strong> Iniciar Sesión </strong> 
                        </a>
                    </div> 
                }

                {
                    user && <div className={`navbar-end `} style={tabStyle}>
                        <a 
                            onClick={() => click('Posts')} 
                            className={'navbar-item'}
                            style={navTextStyle}
                        > 
                            <strong> Chat </strong> 
                        </a>                    
                    </div>
                }

                {
                    user && <div 
                        className={`navbar-end `} 
                        style={{marginLeft:'initial', ...tabStyle}}
                    >
                        <a 
                            onClick={() => click('Forum')} 
                            className={'navbar-item'}
                            style={navTextStyle}
                        > 
                            <strong> Preguntas </strong> 
                        </a>                    
                    </div>
                }

                {
                    user && <div className={`navbar-end `} style={{marginLeft:'initial', ...tabStyle }}>
                        <a 
                            onClick={() => click('Recordings')} 
                            className={'navbar-item'}
                            style={navTextStyle}
                        > 
                            <strong> Grabaciones </strong> 
                        </a>
                    </div>
                }
            </div>
        </div>
    </nav>
}
