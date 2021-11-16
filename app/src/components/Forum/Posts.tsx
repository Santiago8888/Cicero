/* eslint-disable jsx-a11y/anchor-is-valid */

import { CSSProperties, useEffect, useState } from 'react'
import { Header, Modal } from './Atoms'
import { iUser, Sign } from '../../App'
import { ObjectID } from 'bson'



const footerBoxStyle:CSSProperties = {marginBottom:10, borderTop: '2px #ededed solid', paddingTop:10}
interface iComment { comment:string, name:string, image?:Sign }
const Comment = ({ comment, name, image }:iComment) => <div style={{...footerBoxStyle, padding:10, marginBottom:0 }}>
    <div className='media'>
        <div className='media-left' style={{margin:'auto'}}>
            <figure className='image is-24x24' style={{marginBottom:'0.5rem'}}>
                <img src={`signs/${image}.png`} alt='Solar sign' />
            </figure>
            <p className='title is-6' style={{textAlign:'center'}}> { name } </p>
        </div>

        <div className='level-item' style={{width:'calc(100% - 160px)', paddingTop:'0.5rem'}}>
            <div className='content' style={{ textAlign:'left', width:'100%'}}>
                <p> { comment } </p>
            </div>
        </div>
    </div>
</div>


export interface iPost { 
    _id?:ObjectID, 
    id?:number, 
    title:string, 
    name:string, 
    image?:Sign, 
    detail:string, 
    likes:string[], 
    comments:iComment[] 
}

interface IPost extends iPost { 
    id:number, 
    user:iUser, 
    reply(text:string, postId:number):void, 
    like(postId:number):void 
}

const Post = ({ id, user, title, name, image, detail, likes, comments, reply, like }: IPost) => {
    const [ canComment, setCanComment ] = useState(false) 
    const [ showComments, setShowComments ] = useState(false)
    const [ value, setValue ] = useState('')

    useEffect(() => {}, [comments])

    const comment = (text:string, id:number) => {
        reply(text, id)
        setCanComment(false)
        setShowComments(true)
        setValue('')
    }

    const clickComment = () => {
        setCanComment(showComments ? false : true)
        setShowComments(!showComments)
    }
    
    return <div style={{display:'flex', marginBottom:64}}>
        <div className='card' style={{textAlign:'left', width:'100%'}}>
            <header className='card-header' style={{height:48}}>
                <figure className='image is-24x24' style={{margin:'auto 12px'}}>
                    <img src={`signs/${image}.png`} alt='Solar sign' />
                </figure>
                <p className='title is-4' style={{ margin:'auto 12px'}}>
                    { name }
                </p>
            </header>

            <div className='card-content' style={{paddingBottom:'0.25rem'}}>
                <div className='content' style={{minHeight: 100, textAlign:'left', width:'100%'}}>
                    <h5> { title } </h5>
                    <p> { detail } </p>
                </div>

                <nav className='level'>
                    <div className='level-item'>
                        <a
                            style={{
                                width:'100%', 
                                textAlign:'left', 
                                fontSize:'0.9rem',
                                fontWeight: likes.find((u) => u === user.user_id) ? 700 : 400,
                                color: likes.find((u) => u === user.user_id) ? 'darkolivegreen' : '#4a4a4a'
                            }}
                            onClick={() => like(id)} 
                        > { likes.length } Like{likes.length !== 1 ? 's' : '' } </a>
                    </div>

                    <div className='level-item'>
                        <a 
                            style={{width:'100%', textAlign:'right', color:'#4a4a4a', fontSize:'0.9rem' }}
                            onClick={clickComment}
                        > 
                            { comments.length } Comentario{ comments.length !== 1 ? 's' : '' } 
                        </a>
                    </div>
                </nav>

            </div>

            {
                canComment && 
                <div className='field has-addons' style={footerBoxStyle}>
                    <div className='control' style={{width:'100%', marginLeft:20}}>
                        <input 
                            type='text' 
                            className='input' 
                            placeholder='Añade tu comentario'
                            onChange={({target:{value}}) => setValue(value)}                        
                            onKeyPress={({ key }) => key === 'Enter' ? comment(value, id) : null}
                        />
                    </div>

                    <div className='control' style={{marginRight:20}}>
                        <a className='button' style={{background:'darkolivegreen'}} onClick={() => comment(value, id)}> 
                            <svg 
                                xmlns='http://www.w3.org/2000/svg' 
                                viewBox='0 0 24 24' 
                                data-supported-dps='24x24' 
                                fill='white' 
                                className='mercado-match' 
                                width='24' 
                                height='24' 
                                focusable='false'
                            ><path d='M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z'></path></svg>
                        </a>
                    </div>
                </div>
            }

            { showComments && comments.map((comment) => <Comment {...comment}/>)}
        </div>
    </div>
}


export interface iPosts { 
    user:iUser
    posts:iPost[]
    post(post:iPost):void
    like(id:number):void
    reply(text:string, id:number):void
}

export const emptyPost = { title:'', name:'', detail:'', likes:[], comments:[] }
export const Posts = ({user, posts, post, reply, like}: iPosts) => {
    const [ isActive, setActive] = useState(false)
    const [ newPost, setNewPost ] = useState<iPost>(emptyPost)

    const submit = () => {
        post({...newPost, likes:[user.user_id], image:user.sign, name:user.name })
        setActive(false)
        setNewPost(emptyPost)
    }

    return <div className='content' style={{maxWidth:640, margin:'auto'}}>
        <Header 
            title={'Astro Café'} 
            description={'Este es un espacio para compartir y aprender, todo el contendio relacionado con Saturno y el curso es bienvenido. Nuestra esperanza es que al aprender juntos se nos facilite aplicar los conocimientos en la vida diaria.'} 
            buttonText={'Nueva Publicación'}
            click={() => setActive(true)}
        />

        <Modal 
            submit={submit} 
            title={'Nueva Publicación'} 
            isActive={isActive} 
            deactivate={() => setActive(false)}
        >
            <div className='field'>
                <label className='label'> Título: </label>
                <div className='control'>
                    <input 
                        type='text' 
                        className='input' 
                        value={newPost.title} 
                        placeholder={'Elige el título de tu publicación.'}
                        onChange={({target:{value}})=> setNewPost({...newPost, title:value})}
                    />
                </div>
            </div>

            <div className='field'>
                <label className='label'> Mensaje: </label>    
                <div className='control'>
                    <textarea 
                        className='textarea' 
                        placeholder='Puedes compartir alguna experiencia, aprendizaje o meta.' 
                        value={newPost.detail} 
                        onChange={({target:{value}})=> setNewPost({...newPost, detail:value})}
                    />
                </div>
            </div>
        </Modal>

        { posts.map((post, i) => <Post id={i} user={user} {...post} reply={reply} like={like} key={i}/>) } 
    </div>
}
