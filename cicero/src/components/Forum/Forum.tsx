import { useState } from "react"

export const cardStyle = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

export const headerStyle = { backgroundColor: 'rgb(72, 72, 72)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }

interface iQuestion { question:string, details:string }
const Question = ({ question, details }: iQuestion) => <div className='card' style={cardStyle}>
    <header className='card-header' style={headerStyle}>
        <p className='card-header-title' style={{color:'white', fontSize:'1.25rem'}}> { question } </p>
    </header>

    <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
        <p> { details } </p> 
    </div>
</div>


interface iModal { isActive:boolean, deactivate():void, submit(question:iQuestion):void }
const Modal = ({ isActive, deactivate, submit }:iModal) => {
    const [question, setQuestion] = useState('')
    const [details, setDetails] = useState('')

    return <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-content">
            <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
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
        </div>

        <button className='button' onClick={() => submit({ question, details })}> Siguiente </button>
    </div>
}


export interface iForum { title:string, description:string, questions:iQuestion[] }
export const Forum = ({ title, description, questions }: iForum) => {
    const [isActive, setActive] = useState(false)
    const submit = (question:iQuestion) => {console.log('question', question)}

    return <div className="content">
        <h1> { title } </h1>
        <div className='columns' >
            <div className='column'>
                <p> { description } </p>
            </div>

            <div className='column'>
                <button className='button'> 
                    Nueva Pregunta 
                </button>
            </div>
        </div>

        {
            questions.map((q, i) => 
                <Question  {...q} key={i}/>
            )
        }

        <Modal 
            isActive={isActive} 
            deactivate={() => setActive(false)}
            submit={submit}
        />

    </div>
}
