interface iAnswer { answer:string, value:string }
interface iQuestion { question:string, answers:iAnswer[]}
const Question = ({question, answers}: iQuestion) => <div className="field is-horizontal">
    <div className="field-label">
        <label className="label"> { question } </label>
    </div>

    <div className="field-body">
        <div className="field is-narrow">
            <div className="control">
                {
                    answers.map(({ answer, value }) => 
                        <label className="radio">
                            <input type="radio" name="member" value={value}/>
                            { answer }
                        </label>
                    )
                }
            </div>
        </div>
    </div>
</div>



export const Quiz = () => {}
