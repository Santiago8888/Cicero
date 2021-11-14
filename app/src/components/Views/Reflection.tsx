import { emptyPost, iPost } from '../Forum/Posts'
import { useMediaQuery } from 'react-responsive'
import { CSSProperties, useState } from 'react'
import { iApprove, iUser } from '../../App'
import { Modal } from '../Forum/Atoms'
import { questionStyle } from './Quiz'


interface iHeader { title:string, description?:string[], midScreen:boolean }
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

const styleCta:CSSProperties = { margin:'auto', marginTop:'3rem' }
interface iCta { midScreen:boolean, user:iUser, text:string, click():void }
const CTA = ({ midScreen, user, text, click }:iCta) => <div style={{...styleCta, width:midScreen ? 800 : 320}}>
    <button
        onClick={click} 
        className='button is-link' 
        style={{
            borderRadius:12, 
            marginBottom:'3rem',
            width:240, 
            fontSize:'1.25rem', 
            fontWeight:600, 
            backgroundColor:'saddlebrown'
        }}
        disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
    > { text } </button>
</div>

interface iReflection { 
    title:string
    description?:string[]
    posts?:string[]
    user:iUser
    numbered?:boolean
    end?:boolean
    next():void
    approve(props:iApprove):void 
}

export const Reflection = ({posts=[], user, title, description, numbered, end, approve, next }:iReflection) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const [active, setActive] = useState(false)
    const [ newPost, setNewPost ] = useState<iPost>(emptyPost)

    const submit = (post:iPost) => {
        setActive(false)

        const newPost = {...post, likes:[user.user_id], image:user.sign, name:user.name }
        approve({newPost})

        next()
    }

    return <div className='content'>
        <Header title={title} midScreen={midScreen} description={description} />

        <div style={{...questionStyle, padding:'0px 24px'}}>
            { posts?.map((post, i) => 
                <p style={{fontSize:'1.25rem', margin:'2rem auto'}}> 
                    {numbered &&  <strong> { i + 1 }. </strong> } 
                    { post } 
                </p>
            )}
        </div>

        { !end && <CTA midScreen={midScreen} text={'Haz una publicación'} click={() => setActive(true)} user={user}/> }

        <Modal 
            isActive={active} 
            title={'Nueva Publicación'} 
            deactivate={() => setActive(false)} 
            submit={() => submit(newPost)}
        >
            <div className='field'>
                <label className='label'> Título: </label>
                <div className="select" style={{ maxWidth:600, height:'auto' }}>
                    <select 
                        style={{height:'auto', whiteSpace:'break-spaces'}}
                        onChange={({target:{value}})=> setNewPost({...newPost, title:value})}
                    > 
                        <option/>
                        { posts.map(p => <option> { p }</option>)} 
                    </select>
                </div>
            </div>

            <div className='field'>
                <label className='label'> Contenido: </label>    
                <div className='control'>
                    <textarea 
                        className='textarea' 
                        value={newPost.detail} 
                        placeholder='Comparte tu experiencia o aprendizaje...' 
                        onChange={({target:{value}})=> setNewPost({...newPost, detail:value})}
                    />
                </div>
            </div>            
        </Modal>
    </div>
}
