import { useMediaQuery } from 'react-responsive'
import { Modal } from '../Forum/Atoms'
import { questionStyle } from './Quiz'
import { CSSProperties, useState } from 'react'
import { iUser } from '../../App'

interface iHeader extends iReflection { midScreen:boolean }
const Header = ({ title, midScreen, description=[] }:iHeader) => <>
    <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> { title } </h1>
    {
        description.map((sentence) => <h3 
        style={{
            margin:'0rem auto',
            color: '#333',
            fontSize: '1.25em',
            textAlign: 'center',
            fontWeight: 500,
            width: midScreen ? 720 : 320        
        }}
    > { sentence } </h3>
    )}

    <hr style={{ backgroundColor:'darkolivegreen', margin:' 3rem auto', width:midScreen ? 600 : 320 }}/>
</>

const styleCta:CSSProperties = { marginTop:'3rem' }
interface iCta { midScreen:boolean, user:iUser, text:string, click():void }
const CTA = ({ midScreen, user, text, click }:iCta) => <div style={{...styleCta, width:midScreen ? 800 : 320}}>
    <button
        onClick={click} 
        className='button is-link' 
        style={{
            float: !midScreen ? 'inherit' : 'right', 
            borderRadius:12, 
            marginBottom:'3rem',
            width:180, 
            fontSize:'1.25rem', 
            fontWeight:600, 
            backgroundColor:'saddlebrown'
        }}
        disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
    > { text } </button>
</div>

interface iReflection { title:string, description?:string[], posts?:string[], user:iUser, next():void }
export const Reflection = ({posts=[], ...props}:iReflection) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const [active, setActive] = useState(false)

    return <div className='content'>
        <Header {...props} midScreen={midScreen} />

        <div style={{...questionStyle, padding:'0px 24px'}}>
            { posts?.map((post, i) => 
                <p style={{fontSize:'1.25rem', margin:'2rem auto'}}> <strong> { i + 1 }. </strong> { post } </p>
            )}
        </div>

        <CTA midScreen={midScreen} text={'Visitar el foro'} click={() => setActive(true)} user={props.user}/>

        <Modal 
            isActive={active} 
            title={'Nueva Publicación'} 
            deactivate={() => setActive(false)} 
            submit={props.next}
        >
            <div className='field'>
                <label className='label'> Título: </label>
                <div className="select" style={{ maxWidth:600, height:'auto', whiteSpace:'break-spaces' }}>
                    <select> 
                        <option />
                        { posts.map(p => <option> { p }</option>)} 
                    </select>
                </div>
            </div>

            <div className='field'>
                <label className='label'> Contenido: </label>    
                <div className='control'>
                    <textarea 
                        className='textarea' 
                        placeholder='Comparte tu experiencia o aprendizaje...' 
                        onChange={({target:{value}}) => {}}
                    />
                </div>
            </div>            
        </Modal>
    </div>
}
