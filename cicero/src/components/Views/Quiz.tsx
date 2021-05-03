import { iUser } from "../../App"
import { useState } from "react"

interface iAnswer { answer:string, value:boolean }
export interface iQuestion { index:number, question:string, answers:iAnswer[], }
interface IQuestion extends iQuestion { select(index:number, value:boolean):void }
const Question = ({index, question, answers, select}:IQuestion) => <div className="field is-horizontal">
    <div className="field-label">
        <label className="label"> { question } </label>
    </div>

    <div className="field-body">
        <div className="field is-narrow">
            <div className="control">
                {
                    answers.map(({ answer, value }) => 
                        <label className="radio">
                            <input 
                                type="radio" 
                                name="member" 
                                onChange={() => select(index, value)}
                            />
                            { answer }
                        </label>
                    )
                }
            </div>
        </div>
    </div>
</div>


interface iModal { user:iUser, score:number, isActive:boolean, approved:boolean, minScore:number, deactivate():void, next():void }
const Modal = ({ user, score, isActive, approved, minScore, deactivate, next }:iModal) => <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-content">
        { 
            !approved && user.quizFailures === 2 ? null 
            :   <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
        }

        { approved ? `!Felicidades! Has acertado ${score} preguntas` : '' }
        { !approved && user.quizFailures === 0 ? `` : `Lo sentimos solo has acertado ${score} preguntas.` }
        { !approved && user.quizFailures === 1 ? `` : `Acertaste ${score} preguntas, necesitas ${minScore} para aprobar.` }
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
    minScore?:number,
    next():void
    approve(score:number):boolean|void
    user:iUser
}

const defaultMessage = { approve:'', fail:'' }
export const Quiz = ({ title, description, questions=[], minScore, next, approve, user }: iQuiz) =>  {
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
        <h1> { title } </h1>
        <p> { description } </p>

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
            className='button' 
            disabled={Object.values(answers).some(a => a === undefined)} 
            onClick={submit}
        > Enviar </button>

        <Modal 
            isActive={isActive} 
            deactivate={()=> setActive(false)}

            score={score as number}
            approved={approved as boolean}
            minScore={minScore as number}
            user={user}

            next={next}
        />
    </div>
}
