import { useMediaQuery } from 'react-responsive'
import { CSSProperties } from 'react'


const descriptionStyle:CSSProperties = {
    margin:'0rem auto',
    color: '#333',
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
    backgroundColor:'darkblue'
}

const dividerStyle = { backgroundColor:'darkblue', margin:'1.5rem auto 3rem' }
interface iHeader { title:string, description:string, buttonText:string, submit():void }
export const Header = ({ title, description, buttonText, submit }:iHeader) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> 
            { title } 
        </h1>

        <h3 style={{...descriptionStyle, width:midScreen ? 800 : 320}}> 
            { description } 
        </h3>


        <div style={{maxWidth:800, margin:'auto'}}>
            <button className='button is-link' style={buttonStyle} onClick={submit}> 
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
    deactivate(): void
    submit(): void 
}

export const Modal = ({ title, isActive, children, deactivate, submit }:iModal) => {
    return <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-card">
            <header className="modal-card-head" style={{backgroundColor:'darkblue'}}>
                <p className="modal-card-title" style={{marginBottom:0, color:'white'}}> { title } </p>
                <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
            </header>

            <section className="modal-card-body" style={{minHeight:120, display:'table', textAlign:'left'}}>
                { children }
            </section>

            <footer className="modal-card-foot">
                <button 
                    className='button is-link' 
                    onClick={submit}
                    style={{backgroundColor:'darkblue', margin:'auto'}}
                >  Siguiente </button>
            </footer>
        </div>
    </div>
}


interface iLikes { likes:number, like():void } 
export const Likes = ({likes, like}: iLikes) => <div style={{width:80}}>
    <a title="Like" onClick={like}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} style={{fill:'goldenrod'}}>
            <path d="M0 15.878 l12-11.878 12 11.878-4 4.122-8-8-8 8-4-4.122z" />
        </svg>
    </a><br/>

    <p style={{color:'darkblue', fontSize:24, fontWeight:600, marginTop:-10}}> { likes } </p>
</div>