import { useState } from "react"

interface iAnswer { answer:string, value:boolean }
export interface iQuestion { index:number, question:string, answers:iAnswer[]}
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


interface iModal { result:number, isActive:boolean, deactivate():void, next():void }
const Modal = ({ result, isActive, deactivate, next }:iModal) => <div className={`modal ${isActive ? 'is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-content">
        <button className="delete" aria-label="close" style={{float:'right'}} onClick={deactivate}/>
        { result }
    </div>
    <button className='button' onClick={next}> Siguiente </button>
</div>

export interface iMessage {approve:string, fail:string}
interface iQuiz { 
    title:string, 
    description:string, 
    questions?:iQuestion[], 
    message?:iMessage, 
    next():void 
}

const defaultMessage = { approve:'', fail:'' }
export const Quiz = ({ title, description, questions=[], message=defaultMessage, next }: iQuiz) =>  {
    const [isActive, setActive] = useState(false)
    const [answers, setAnswers] = useState<{[index:number]:boolean|undefined}>(
        questions.reduce((d, { index }) => ({...d, [index]: undefined }), {})
    )

    const [result, setResult] = useState<number>() 
    const submit = () => {
        setResult(Object.values(answers).filter(a => a).length)
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
            result={result as number}
            deactivate={()=> setActive(false)}
            next={next}
        />
    </div>
}
