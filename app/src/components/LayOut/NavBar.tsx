/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { CSSProperties, useState } from 'react'
import { iHomeData, iUser } from '../../App'


const tabStyle:CSSProperties = { fontSize: '1.2em', backgroundColor:'darkolivegreen' }
const navTextStyle:CSSProperties = {textAlign:'center', color:'white', backgroundColor:'darkolivegreen'}

export type NavbarItem =  'Login' | 'Recordings' | 'Forum' | 'Home' | 'Posts' | 'Back' | 'Next'
interface iNavBar { user?:iUser, homeData:iHomeData, click(item:NavbarItem):void }

const Back = () => <svg xmlns="http://www.w3.org/2000/svg" width="56" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
</svg>

const Next = () => <svg xmlns="http://www.w3.org/2000/svg" width="56" height="32" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
</svg>

const isAdvanced = (user:iUser | undefined) => {
    if(!user) return false

    const { current, progress } = user

    if(current.unit < progress.unit) return true
    if(current.module < progress.module) return true
    if(current.lesson < progress.lesson) return true

    return false
}

export const NavBar = ({ user, homeData:{ recordings, posts, forum }, click }: iNavBar) => {
    const midScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const [ isActive, setActive ] = useState(false)

    return <nav 
        className='navbar is-link' 
        role='navigation' 
        aria-label='main navigation' 
        style={{
            borderBottom: '2px solid #ccc', 
            backgroundColor:'darkolivegreen', 
            padding: midScreen ? '0px 2.5rem' : '0px 8px 0px 0px'
        }}
    >
        <div 
            className='container' 
            style={{maxWidth:2000, paddingLeft:midScreen ? '2.5rem' : 0, paddingRight:midScreen ? '3em' : 0 }}
        >
            <div className='navbar-brand'>
                <a className='navbar-item' onClick={() => click('Home')} style={{backgroundColor:'darkolivegreen'}}>
                    { 
                        !midScreen && (!recordings && !forum && !posts) &&
                        <div 
                            style={{cursor:'pointer', height:32 }} 
                            onClick={() => click('Back')}
                        > <Back /> </div> 
                    }

                    { 
                        !midScreen && (!recordings && !forum && !posts) && isAdvanced(user) 
                        ?   <div 
                                style={{cursor:'pointer', height:32 }} 
                                onClick={() => click('Next')}
                            > <Next/> </div> 
                        :   <img 
                                src='planets/Saturn_terra.png' 
                                style={{ 
                                    height:midScreen ? 56 : 44, 
                                    maxHeight:'none', 
                                    background:'white', 
                                    borderRadius:'50%', 
                                    padding:6
                                }} 
                                alt={'Saturn logo'}
                            />
                    }

                    <p 
                        className='navbar-item' 
                        style={{ fontSize: '2em', color:'white', marginLeft: midScreen ? 24 : 6 }} 
                    > 
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
