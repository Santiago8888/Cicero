import { Header, Modal, Likes } from "./Atoms"
import { useEffect, useState } from "react"

interface iPost { id?:string, title:string, detail:string, likes?:number, comments?:string[] }
interface IPost extends iPost { id:string, reply(text:string, postId:string):void, like(postId:string):void }
const Post = ({ id, title, detail, likes=0, comments=[], reply, like }: IPost) => {
    const [ value, setValue ] = useState('')
    const [ replies, setReplies ] = useState<string[]>([])

    useEffect(() => {
        const recentComments = comments.filter((_, i) => i < 5)
        setReplies(recentComments)
    }, [comments])

    return <div>
        <Likes likes={likes} like={() => like(id)}/>
        <nav className="panel">
            <p className="panel-heading"> { title } </p>
            <div className="panel-block"> { detail } </div>

            <div className="panel-block">
                <div className="field has-addons">
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Comentar"
                            onChange={({target:{value}}) => setValue(value)}                        
                            onKeyPress={({ key }) => key === 'Enter' ? reply(value, id) : null}
                        />
                    </div>

                    <div className="control">
                        <a className="button is-info" onClick={() => reply(value, id)}> 
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                data-supported-dps="24x24" 
                                fill="white" 
                                className="mercado-match" 
                                width="24" 
                                height="24" 
                                focusable="false"
                            ><path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>


            { replies.map(comment => <a className="panel-block is-active"> { comment } </a> ) }

            <div 
                className="panel-block" 
                onClick={() => setReplies(comments)} 
                style={{display:comments.length > replies.length ? 'initial' : 'none' }}
            >
                <button className="button is-link is-outlined is-fullwidth">
                    Mostrar Todos Los Comentarios
                </button>
            </div>
        </nav>
    </div>
}


interface iPosts { posts:iPost[], submit(post:iPost):void, reply(text:string, postId:string):void, like(postId:string):void }
export const Posts = ({posts, submit, reply, like}: iPosts) => {
    const [ isActive, setActive] = useState(false)
    const [ newPost, setNewPost ] = useState<iPost>({ title:'', detail:''})

    return <div className='content'>
        <Header 
            title={"AstroChat"} 
            description={"Interactua con el grupo y comparte lo que haz aprendido."} 
            buttonText={"Publicar"}
            submit={() => setActive(true)}
        />

        <Modal title={"Publicar"} isActive={isActive} submit={() => submit(newPost)} deactivate={() => setActive(false)}>
            <div className="field">
                <label className="label"> Título: </label>
                <div className="control">
                    <input 
                        className="input" 
                        type="text" 
                        value={newPost.title} 
                        onChange={({target:{value}})=> setNewPost({...newPost, title:value})}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label"> Contentido Adicional (opcional): </label>    
                <div className="control">
                    <textarea 
                        className="textarea" 
                        placeholder="e.g. Hello world" 
                        value={newPost.detail} 
                        onChange={({target:{value}})=> setNewPost({...newPost, detail:value})}
                    />
                </div>
            </div>
        </Modal>

        { posts.map((post, i) => <Post id={String(i)} {...post} reply={reply} like={like}/>) } 
    </div>
}
