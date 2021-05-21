import { useMediaQuery } from 'react-responsive'
import { CSSProperties, useState } from "react"
import { Likes } from "./Atoms"


export interface iDoubt { question:string, details:string, likes:number }
const doubtStyle:CSSProperties = {maxWidth:800, textAlign:'left', margin:'auto', marginBottom:'1.5em', display:'flex'}

interface IDoubt extends iDoubt { like(id:string):void } 
const Doubt = ({ question, details, likes, like }:IDoubt) => <div style={doubtStyle}>
    <Likes likes={likes} like={() => like} style={{textAlign:'center'}}/>
    <div>
        <p style={{color:'darkblue', fontSize:'1.25rem', fontWeight:600, marginBottom:0}}> { question } </p>
        <p> { details } </p>
    </div>
</div>


interface iModal { isActive:boolean, deactivate():void, submit(question:iDoubt):void }
const Modal = ({ isActive, deactivate, submit }:iModal) => {
    const [question, setQuestion] = useState('')
    const [details, setDetails] = useState('')

    return <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-card">
            <header className="modal-card-head" style={{backgroundColor:'darkblue'}}>
                <p className="modal-card-title" style={{marginBottom:0, color:'white'}}> Haz una Pregunta </p>
                <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
            </header>

            <section className="modal-card-body" style={{minHeight:120, display:'table', textAlign:'left'}}>
                <div className="field">
                    <label className="label"> Pregunta </label>

                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            value={question} 
                            onChange={({target:{value}})=> setQuestion(value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label"> Detalles Adicionales (opcional): </label>    
                    <div className="control">
                        <textarea 
                            className="textarea" 
                            placeholder="e.g. Hello world" 
                            value={details} 
                            onChange={({target:{value}})=> setDetails(value)}
                        />
                    </div>
                </div>
            </section>

            <footer className="modal-card-foot">
                <button 
                    className='button is-link' 
                    onClick={() => submit({ question, details, likes:0 })} 
                    style={{backgroundColor:'darkblue', margin:'auto'}}
                >  Siguiente </button>
            </footer>
        </div>
    </div>
}


export interface iForum { title:string, description:string, questions:iDoubt[] }
interface IForum extends iForum { submit(question:iDoubt):void, like(id:string):void }
export const Forum = ({ title, description, questions, submit, like }: IForum) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const [isActive, setActive] = useState(false)

    const clickModal = (doubt:iDoubt) => {
        setActive(false)
        submit(doubt)
    }

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'left',
                fontWeight: 500,
                width: midScreen ? 800 : 320        
            }}
        > { description } </h3>


        <div style={{maxWidth:800, margin:'auto'}}>
            <button 
                className='button is-link' 
                style={{
                    width:240, 
                    fontWeight:600, 
                    borderRadius:12, 
                    marginTop:'1.5em', 
                    fontSize:'1.25rem', 
                    marginBottom:'1.5em',
                    backgroundColor:'darkblue'
                }}
                onClick={() => setActive(true)}
            > Haz una Pregunta </button>
        </div> 
        
        <hr style={{ backgroundColor:'darkblue', margin:'1.5rem auto 3rem', width:midScreen ? 600 : 320 }}/>

        { questions.map((q, i) => <Doubt  {...q} like={() => like(String(i))} key={i}/> ) }

        <Modal 
            isActive={isActive} 
            deactivate={() => setActive(false)}
            submit={clickModal}
        />

    </div>
}
