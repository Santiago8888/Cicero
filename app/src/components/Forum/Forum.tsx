import { useMediaQuery } from 'react-responsive'
import { CSSProperties, useState } from 'react'
import amplitude from 'amplitude-js'
import { iUser } from '../../App'
import { Likes } from './Atoms'
import { ObjectID } from 'bson'


export interface iDoubt { _id?:ObjectID, question:string, details:string, likes:string[] }
const doubtStyle:CSSProperties = {maxWidth:720, textAlign:'left', margin:'auto', marginBottom:'1.5em', display:'flex'}

interface IDoubt extends iDoubt { user:iUser, midScreen:boolean, like():void } 
const Doubt = ({ user, question, details, likes, midScreen, like }:IDoubt) => <div style={doubtStyle}>
    <Likes user={user} likes={likes} like={like} style={{textAlign:'center'}}/>
    <div style={{maxWidth: midScreen ? 600 : 240 }}>
        <p style={{color:'saddlebrown', fontSize:'1.25rem', fontWeight:600, marginBottom:0}}> { question } </p>
        <p style={{color:'#363636'}}> { details } </p>
    </div>
</div>


interface iModal { user:iUser, isActive:boolean, deactivate():void, submit(question:iDoubt):void }
const Modal = ({ user, isActive, deactivate, submit }:iModal) => {
    const [question, setQuestion] = useState('')
    const [details, setDetails] = useState('')

    const click = () => {
        submit({ question, details, likes:[user.user_id] })
        try { amplitude.getInstance().logEvent('DOUBT', { question, details }) } catch(e) { }

        
        setQuestion('')
        setDetails('')
    }

    return <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className='modal-background' />
        <div className='modal-card'>
            <header className='modal-card-head' style={{backgroundColor:'darkolivegreen'}}>
                <p className='modal-card-title' style={{marginBottom:0, color:'white'}}> Haz una Pregunta </p>
                <button className='delete' aria-label='close' style={{float:'right'}} onClick={deactivate}/>
            </header>

            <section className='modal-card-body' style={{minHeight:120, display:'table', textAlign:'left'}}>
                <div className='field'>
                    <label className='label'> Pregunta </label>

                    <div className='control'>
                        <input 
                            className='input' 
                            type='text' 
                            value={question} 
                            onChange={({target:{value}})=> setQuestion(value)}
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'> Detalles Adicionales (opcional): </label>    
                    <div className='control'>
                        <textarea 
                            className='textarea' 
                            placeholder='Comparte un poco de contexto o la motivación de tu pregunta.' 
                            value={details} 
                            onChange={({target:{value}})=> setDetails(value)}
                        />
                    </div>
                </div>
            </section>

            <footer className='modal-card-foot'>
                <button 
                    className='button is-link' 
                    style={{backgroundColor:'saddlebrown', margin:'auto'}}
                    onClick={click} 
                >  Preguntar </button>
            </footer>
        </div>
    </div>
}


export interface iForum { user:iUser, title:string, description:string, questions:iDoubt[] }
interface IForum extends iForum { submit(question:iDoubt):void, like(id:number):void }
export const Forum = ({ user, title, questions, submit, like }: IForum) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const [isActive, setActive] = useState(false)

    const clickModal = (doubt:iDoubt) => {
        setActive(false)
        submit(doubt)
    }

    return <div className='content'>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 640 : 320        
            }}
        > 
            Aquí podrás hacer todas tus preguntas sobre lo que no te haya quedado del material curso. Las preguntas serán respondidas cada Jueves a las 7:30pm (CDMX) en un live que será grabado. <br/><br/>
            <span style={{fontWeight:400}}>Si te interesa la respuesta a una duda puedes "votar" por ella utilizando la flecha que se encuentra a la izquierda. Las dudas con más votos serán respondidas primero y con mayor profundidad.</span> 
         </h3>


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
                    backgroundColor:'darkolivegreen'
                }}
                onClick={() => setActive(true)}
            > Haz una Pregunta </button>
        </div> 
        
        <hr style={{ backgroundColor:'darkolivegreen', margin:'1.5rem auto 3rem', width:midScreen ? 600 : 320 }}/>

        { 
            questions.sort(({likes:a}, {likes:b}) => a.length > b.length ? -1 : 1)
            .map((q, i) => <Doubt midScreen={midScreen} {...q} user={user} like={() => like(i)} key={i}/> ) 
        }

        <Modal 
            user={user}
            isActive={isActive} 
            submit={clickModal}
            deactivate={() => setActive(false)}
        />

    </div>
}
