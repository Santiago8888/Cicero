import { useState } from "react"

interface iAnswer { answer:string, value:number }
interface iQuestion { index:number, question:string, answers:iAnswer[]}
interface IQuestion extends iQuestion { select(index:number, value:number):void }
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



interface iQuiz { title:string, description:string, questions:iQuestion[] }
export const Quiz = ({ title, description, questions }: iQuiz) =>  {
    const [answers, setAnswers] = useState<{[index:number]:number|undefined}>(
        questions.reduce((d, { index }) => ({...d, [index]: undefined }), {})
    )

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

        <button className='button' disabled={Object.values(answers).some(a => !a)}> 
            Enviar 
        </button>
    </div>
}
