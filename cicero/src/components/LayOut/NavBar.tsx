/* eslint-disable jsx-a11y/anchor-is-valid */

import { iUser } from '../../App'
import { useState } from 'react'


export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home'
interface iNavBar { user?:iUser, click(item:NavbarItem):void }
export const NavBar = ({ click, user }: iNavBar) => {
    const [ isActive, setActive ] = useState(false)

    return <nav 
        className='navbar is-link' 
        role='navigation' 
        aria-label='main navigation' 
        style={{borderBottom: '2px solid #ccc', backgroundColor:'darkblue', padding:'0px 2.5rem'}}
    >
        <div className='container' style={{maxWidth:2000, paddingLeft:'2.5rem', paddingRight:'3em' }}>
            <div className='navbar-brand'>
                <a className='navbar-item' onClick={() => click('Home')}>
                    <img src='SocialQ.png' style={{ height:36, maxHeight: 'none' }} alt={'SocialQ logo'}/>
                    <p className='navbar-item' style={{ fontSize: '2em', color:'white' }} > SocialQ </p>
                </a>

                <a 
                    role='button' 
                    className={`navbar-burger ${isActive ? 'is-active': ''}`}
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
                style={{ marginRight:'auto' }}
            >
                { 
                    !user && <div className={`navbar-end `} style={{fontSize: '1.2em', backgroundColor:'darkblue'}} >
                        <a onClick={() => click('Login')} className={'navbar-item'}> 
                            <strong> Iniciar Sesión </strong> 
                        </a>
                    </div> 
                }

                {
                    user && <div className={`navbar-end `} style={{fontSize: '1.2em'}} hidden={!!user}>
                        <a onClick={() => click('Forum')} className={'navbar-item'}> 
                            <strong> Forum </strong> 
                        </a>                    
                    </div>
                }

                {
                    user && <div className={`navbar-end `} style={{fontSize: '1.2em', marginLeft:'initial'}}>
                        <a onClick={() => click('Recordings')} className={'navbar-item'}> 
                            <strong> Grabaciones </strong> 
                        </a>
                    </div>
                }
            </div>
        </div>
    </nav>
}
