/* eslint-disable jsx-a11y/anchor-is-valid */

import { iUser } from '../../App'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'


export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home' | 'Posts'
interface iNavBar { user?:iUser, click(item:NavbarItem):void }
export const NavBar = ({ click, user }: iNavBar) => {
    const midScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [ isActive, setActive ] = useState(false)

    return <nav 
        className='navbar is-link' 
        role='navigation' 
        aria-label='main navigation' 
        style={{borderBottom: '2px solid #ccc', backgroundColor:'darkblue', padding:'0px 2.5rem'}}
    >
        <div className='container' style={{maxWidth:2000, paddingLeft:midScreen ? '2.5rem' : 0, paddingRight:midScreen ? '3em' : 0 }}>
            <div className='navbar-brand'>
                <a className='navbar-item' onClick={() => click('Home')}>
                    <img src='SocialQ.png' style={{ height:36, maxHeight: 'none' }} alt={'SocialQ logo'}/>
                    <p className='navbar-item' style={{ fontSize: '2em', color:'white' }} > Astro Consciencia </p>
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
                style={{ marginRight:'auto', backgroundColor:'darkblue' }}
            >
                { 
                    !user && <div className={`navbar-end `} style={{fontSize: '1.2em', backgroundColor:'darkblue'}} >
                        <a 
                            onClick={() => click('Login')} 
                            className={'navbar-item'} 
                            style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                        > 
                            <strong> Iniciar Sesión </strong> 
                        </a>
                    </div> 
                }

                {
                    user && <div className={`navbar-end `} style={{fontSize: '1.2em', backgroundColor:'darkblue'}}>
                        <a 
                            onClick={() => click('Posts')} 
                            className={'navbar-item'}
                            style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                        > 
                            <strong> Chat </strong> 
                        </a>                    
                    </div>
                }

                {
                    user && <div className={`navbar-end `} style={{fontSize: '1.2em', marginLeft:'initial', backgroundColor:'darkblue'}}>
                        <a 
                            onClick={() => click('Forum')} 
                            className={'navbar-item'}
                            style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                        > 
                            <strong> Forum </strong> 
                        </a>                    
                    </div>
                }

                {
                    user && <div className={`navbar-end `} style={{fontSize: '1.2em', marginLeft:'initial', backgroundClip:'darkblue'}}>
                        <a 
                            onClick={() => click('Recordings')} 
                            className={'navbar-item'}
                            style={{textAlign:'center', color:'white', backgroundColor:'darkblue'}}
                        > 
                            <strong> Grabaciones </strong> 
                        </a>
                    </div>
                }
            </div>
        </div>
    </nav>
}
