import { iUser } from "../../App"
import { useState } from "react"


interface iAnswer { answer:string, value:boolean }
export interface iQuestion { question:string, answers:iAnswer[], }

interface IQuestion extends iQuestion { index:number, select(index:number, value:boolean):void }
const Question = ({index, question, answers, select}:IQuestion) => <div 
    className="field" 
    style={{textAlign:'left', maxWidth:800, margin:'auto', marginBottom:'1.5rem'}}
>
    <label className="label" style={{fontSize:'1.25em'}}> { question } </label>
    {
        answers.map(({ answer, value }, i) => 
            <div className="control">
                <label className="radio" style={{fontSize:'1.25em', marginBottom:'0.25em'}}>
                    <input 
                        type="radio" 
                        name={String(index)}
                        style={{marginRight:12}}
                        onChange={() => select(index, value)}
                    />
                    { answer }
                </label>
            </div>
        )
    }
</div>



const encouragementMsg = () => `!Ánimo aún tienes otra oportunidad!`
const retryMsg = 'Lo sentimos, no has aprobado el quiz. Deberas reiniciar el módulo.'
interface iModal { user:iUser, questions: iQuestion[], score:number, isActive:boolean, approved:boolean, min:number, deactivate():void, next():void }
const Modal = ({ user, questions, score, isActive, approved, min, deactivate, next }:iModal) => <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-card">
        <header className="modal-card-head" style={{backgroundColor:'darkblue'}}>
            <p className="modal-card-title" style={{marginBottom:0, color:'white'}}>Quiz</p>
            { 
                !approved && user.quizFailures === 2 ? null 
                :   <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
            }
        </header>

        <section className="modal-card-body" style={{minHeight:120, display:'table'}}>
            <p style={{display:'table-cell', verticalAlign:'middle'}}>
                { approved ? <span style={{fontSize:'1.5rem', fontWeight:600}}>¡Felicidades!</span> : <>Lo sentimos.</> } <br/> 
                 Acertaste <strong>{score}</strong> de <strong>{questions.length}</strong> preguntas. <br/>
                { !approved && user.quizFailures > 0 ? <>Necesitas mínimo {min} para aprobar <br/></>: '' }
                { !approved && user.quizFailures > 1 ? encouragementMsg : '' }
                { !approved && user.quizFailures > 2 ? retryMsg : '' }

            </p>
        </section>

        <footer className="modal-card-foot">
            <button className='button is-link' onClick={next} style={{backgroundColor:'darkblue', margin:'auto'}}> 
                { approved || user.quizFailures === 0 ? `Continuar` : '' }
                { !approved && user.quizFailures === 1 ? `Intentar de Nuevo` : '' }
                { !approved && user.quizFailures === 2 ? `Reiniciar` : '' }
            </button>
        </footer>
    </div>
</div>


interface iQuiz { 
    title:string
    description:string,
    questions?:iQuestion[]
    min?:number,
    next():void
    approve(score:number):boolean|void
    user:iUser
}
const defaultMessage = { approve:'', fail:'' }
export const Quiz = ({ title, description, questions=[], min, next, approve, user }: iQuiz) =>  {
    const [isActive, setActive] = useState(false)
    const [answers, setAnswers] = useState<{[idx:number]:boolean|undefined}>(
        questions.reduce((d, {}, idx) => ({...d, [idx]: undefined }), {})
    )

    const [score, setScore] = useState<number>() 
    const [approved, setApproved] = useState<boolean>()
    const submit = () => {
        const score = Object.values(answers).filter(a => a).length
        setScore(score)

        const isApproved = approve(score) || false
        setApproved(isApproved)

        setActive(true)
    }

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto 2rem',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'left',
                fontWeight: 500,
                width: 800        
            }}
        > { description } </h3>

        {
            questions.map((q, i) => 
                <Question 
                    {...q}
                    index={i}
                    key={i} 
                    select={(idx, value) => setAnswers({...answers, [idx]:value})}
                />
            )
        }

        <button 
            className='button is-link' 
            style={{borderRadius:12, width:180, fontSize:'1.25rem', fontWeight:600, marginTop:'2em', backgroundColor:'darkblue'}}
            disabled={Object.values(answers).some(a => a === undefined)} 
            onClick={submit}
        > ENVIAR </button>

        <Modal 
            isActive={isActive} 
            questions={questions}
            deactivate={()=> setActive(false)}

            score={score as number}
            approved={approved as boolean}
            min={min as number}
            user={user}

            next={next}
        />
    </div>
}
