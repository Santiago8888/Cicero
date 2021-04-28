import { iUser } from "../../App"
import { useState } from "react"


interface iAnswer { answer:string, value:boolean }
export interface iQuestion { index:number, question:string, answers:iAnswer[], }

interface IQuestion extends iQuestion { select(index:number, value:boolean):void }
const Question = ({index, question, answers, select}:IQuestion) => <div 
    className="field" 
    style={{textAlign:'left', maxWidth:800, margin:'auto'}}
>
    <label className="label" style={{fontSize:'1.25em'}}> { question } </label>
    {
        answers.map(({ answer, value }) => 
            <div className="control">
                <label className="radio" style={{fontSize:'1.25em', marginBottom:'0.25em'}}>
                    <input 
                        type="radio" 
                        name="member" 
                        style={{marginRight:12}}
                        onChange={() => select(index, value)}
                    />
                    { answer }
                </label>
            </div>
        )
    }
</div>


interface iModal { user:iUser, score:number, isActive:boolean, approved:boolean, min:number, deactivate():void, next():void }
const Modal = ({ user, score, isActive, approved, min, deactivate, next }:iModal) => <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-content">
        { 
            !approved && user.quizFailures === 2 ? null 
            :   <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
        }

        { approved ? `!Felicidades! Has acertado ${score} preguntas` : '' }
        { !approved && user.quizFailures === 0 ? `` : `Lo sentimos solo has acertado ${score} preguntas.` }
        { !approved && user.quizFailures === 1 ? `` : `Acertaste ${score} preguntas, necesitas ${min} para aprobar.` }
        { !approved && user.quizFailures === 1 ? `` : `Aún tienes una oportunidad más para intentarlo o deberas repetir el módulo.` }
        { !approved && user.quizFailures === 2 ? `` : `Lo sentimos, no has pasado el quiz. Deberas reiniciar el módulo.` }

    </div>
 
    <button className='button' onClick={next}> 
        { approved ? `Continuar` : '' }
        { !approved && user.quizFailures === 1 ? `Intentar de Nuevo` : '' }
        { !approved && user.quizFailures === 2 ? `Reiniciar` : '' }
    </button>
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
    const [answers, setAnswers] = useState<{[index:number]:boolean|undefined}>(
        questions.reduce((d, { index }) => ({...d, [index]: undefined }), {})
    )

    const [score, setScore] = useState<number>() 
    const [approved, setApproved] = useState<boolean>()
    const submit = () => {
        const score = Object.values(answers).filter(a => a).length

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
                    key={i} 
                    select={(index, value) => setAnswers({...answers, [index]:value})}
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
            deactivate={()=> setActive(false)}

            score={score as number}
            approved={approved as boolean}
            min={min as number}
            user={user}

            next={next}
        />
    </div>
}
