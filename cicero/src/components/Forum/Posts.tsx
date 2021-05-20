import { useEffect, useState } from "react"

interface iPost { title:string, detail:string, likes:number, comments:string[], submit(reply:string):void }
export const Post = ({ title, detail, comments, submit }: iPost) => {
    const [value, setValue] = useState('')
    const [replies, setReplies] = useState<string[]>([])

    useEffect(() => {
        const recentComments = comments.filter((_, i) => i < 5)
        setReplies(recentComments)
    }, [comments])

    return <nav className="panel">
        <p className="panel-heading"> { title } </p>
        <div className="panel-block">
            { detail }
        </div>

        <div className="panel-block">
            <div className="field has-addons">
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Comentar"
                        onChange={({target:{value}}) => setValue(value)}                        
                        onKeyPress={({ key }) => key === 'Enter' ? submit(value) : null}
                    />
                </div>

                <div className="control">
                    <a className="button is-info" onClick={() => submit('text')}> 
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
}
