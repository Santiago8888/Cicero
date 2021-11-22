/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { CSSProperties } from 'react'
import { iUser } from '../../App'


const descriptionStyle:CSSProperties = {
    margin:'0rem auto',
    color: '#363636',
    fontSize: '1.25em',
    textAlign: 'center',
    fontWeight: 500,
}

const buttonStyle:CSSProperties = {
    width:180, 
    fontWeight:500, 
    borderRadius:12, 
    marginTop:'2em', 
    fontSize:'1.1rem', 
    marginBottom:'1.5em',
    backgroundColor:'darkolivegreen'
}

const dividerStyle = { backgroundColor:'darkolivegreen', margin:'1.5rem auto 3rem' }
interface iHeader { title:string, description:string, buttonText:string, click():void }
export const Header = ({ title, description, buttonText, click }:iHeader) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> 
            { title } 
        </h1>

        <h3 style={{...descriptionStyle, width:midScreen ? '100%' : 320}}> 
            { description } 
        </h3>


        <div style={{maxWidth:'100%', margin:'auto'}}>
            <button className='button is-link' style={buttonStyle} onClick={click}> 
                { buttonText } 
            </button>
        </div> 
        
        <hr style={{...dividerStyle, width:midScreen ? 600 : 320 }}/>
    </div>
}


interface iModal { 
    title: string
    isActive: boolean
    children: JSX.Element | JSX.Element[]
    cta?:string
    deactivate(): void
    submit(): void 
}

export const Modal = ({ title, isActive, children, cta='Publicar', deactivate, submit }:iModal) => {
    return <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
            <header className='modal-card-head' style={{backgroundColor:'darkolivegreen'}}>
                <p className='modal-card-title' style={{marginBottom:0, color:'white'}}> { title } </p>
                <button className='delete' aria-label='close' style={{float:'right'}} onClick={deactivate}/>
            </header>

            <section className='modal-card-body' style={{minHeight:120, display:'table', textAlign:'left'}}>
                { children }
            </section>

            <footer className='modal-card-foot'>
                <button 
                    className='button is-link' 
                    onClick={submit}
                    style={{backgroundColor:'saddlebrown', margin:'auto'}}
                >  { cta } </button>
            </footer>
        </div>
    </div>
}


interface iLikes { user:iUser, likes:string[], like():void, style?:CSSProperties } 
export const Likes = ({user, likes, style, like}: iLikes) => <div style={{width:80, ...style}}>
    <a title='Like' onClick={like}>
        <svg 
            width={20} 
            viewBox='0 0 24 24' 
            xmlns='http://www.w3.org/2000/svg' 
            style={{fill:likes.includes(user.user_id) ? 'saddlebrown' : 'darkolivegreen' }}
        >
            <path d='M0 15.878 l12-11.878 12 11.878-4 4.122-8-8-8 8-4-4.122z' />
        </svg>
    </a><br/>

    <p style={{color:'saddlebrown', fontSize:24, fontWeight:600, marginTop:-10}}> { likes.length } </p>
</div>
