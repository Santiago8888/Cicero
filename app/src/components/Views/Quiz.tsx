import { CSSProperties, useEffect, useState } from 'react'
import { sign_names } from '../Astral/AstralChart'
import { iApprove, iUser, Sign } from '../../App'
import { useMediaQuery } from 'react-responsive'
import amplitude from 'amplitude-js'
import { Approve } from '../Home'


interface iAnswer { answer:string, value:boolean, sign?:Sign, house?:number }
export interface iQuestion { question:string, answers:iAnswer[], sign?:boolean, house?:boolean }

export const questionStyle:CSSProperties = {
    textAlign:'left', 
    maxWidth:800, 
    margin:'auto auto 3em', 
    border:'1px solid', 
    borderRadius:25, 
    padding:20, 
    borderColor:'#AAA'
}

const getRandomSign = (signs:Sign[]) => sign_names.filter(sign => 
    !signs.includes(sign)
)[Math.floor(Math.random()*(12-signs.length))]

const getRandomSigns = (signs:Sign[]):Sign[] => {
    if(signs.length === 4) return signs
    
    const newSign = getRandomSign(signs)
    return getRandomSigns([...signs, newSign])
}

export const houseNumbers:number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
const getRandomHouse = (houses:number[]) => houseNumbers.filter(house => 
    !houses.includes(house)
)[Math.floor(Math.random()*(12-houses.length))]

const getRandomHouses = (houses:number[]):number[] => {
    if(houses.length === 4) return houses
    
    const newHouse = getRandomHouse(houses)
    return getRandomHouses([...houses, newHouse])
}


interface IQuestion extends iQuestion { 
    index:number
    value:number
    user:iUser 
    select(index:number, value:number):void 
}

const Question = ({index, question, value, answers, sign, user, house, select}:IQuestion) => {
    const [filteredAnswers, setFilteredAnswers] = useState<iAnswer[]>(answers)

    useEffect(() => {
        if (sign) {
            if(!user.sign) return
    
            const randomSigns = getRandomSigns([user.sign as unknown as Sign])        
            const signAnswers = answers.filter(({ sign }) => randomSigns.includes(sign as Sign))
    
            setFilteredAnswers(signAnswers)    
        }

        if (house) {
            if(!user.house) return
    
            const randomHouses = getRandomHouses([user.house])        
            const houseAnswers = answers.filter(({ house }) => randomHouses.includes(house as number))
    
            setFilteredAnswers(houseAnswers)    
        }

    }, [answers, sign, user, house])

    return <div 
        className='field' 
        style={questionStyle}
    >
        <label className='label' style={{fontSize:'1.25em'}}> { question } </label>
        {
            filteredAnswers?.length && answers.map(({ answer:a, sign:s, house:h }, i) => 
                <div 
                    key={i} 
                    className='control' 
                    style={{
                        display:(filteredAnswers || []).map(({ sign, house }) => sign || house).includes(s || h) ? 'auto' : 'none'
                    }}
                >
                    <label className='radio' style={{fontSize:'1.25em', marginBottom:'0.25em'}}>
                        <input 
                            type='radio' 
                            checked={value === i}
                            name={String(index)}
                            style={{marginRight:12}}
                            onChange={() => select(index, i)}
                        />
                        { a }
                    </label>
                </div>
            )
        }
    </div>
}


const encouragementMsg = `¡Ánimo aún tienes otra oportunidad!`
const retryMsg = 'Te invitamos a volver a ver el vídeo :)'
interface iModal { 
    user:iUser
    questions: iQuestion[]
    score:number
    isActive:boolean
    approved:boolean
    min:number
    deactivate():void
    next():void 
}

const Modal = ({ user, questions, score, isActive, approved, min, deactivate, next }:iModal) => <div 
    className={`modal ${isActive ? 'is-active' : ''}`}
>
    <div className='modal-background' />
    <div className='modal-card'>
        <header className='modal-card-head' style={{backgroundColor:'darkolivegreen'}}>
            <p className='modal-card-title' style={{marginBottom:0, color:'white'}}>Quiz</p>
            { approved && <button className='delete' aria-label='close' style={{float:'right'}} onClick={deactivate}/> }
        </header>

        <section className='modal-card-body' style={{minHeight:120, display:'table'}}>
            <p style={{display:'table-cell', verticalAlign:'middle'}}>
                { 
                    approved 
                    ?   <span style={{fontSize:'1.5rem', fontWeight:600}}> ¡Felicidades! </span> 
                    :   <>Lo sentimos.</> 
                } <br/>

                 Acertaste <strong> {score} </strong> de <strong> {questions.length} </strong> preguntas. <br/>

                { 
                    !approved && user.quizFailures === 1 
                    ? <> Necesitas {Math.round(min)} pregunta{min > 1 ? 's' : ''} correcta para aprobar. <br/></>
                    : '' 
                }

                { !approved && user.quizFailures === 1 ? <><br/>{ encouragementMsg }</> : '' }
                { !approved && user.quizFailures === 2 ? <><br/>{ retryMsg }</> : '' }
            </p>
        </section>

        <footer className='modal-card-foot'>
            <button className='button is-link' onClick={next} style={{backgroundColor:'saddlebrown', margin:'auto'}}> 
                { approved || user.quizFailures === 0 ? `Continuar` : '' }
                { !approved && user.quizFailures === 1 ? `Intentar de Nuevo` : '' }
                { !approved && user.quizFailures === 2 ? `Reiniciar` : '' }
            </button>
        </footer>
    </div>
</div>


interface iQuiz { 
    title:string
    description?:string[]
    questions?:iQuestion[]
    min?:number
    next():void
    approve(props:iApprove):Approve
    user:iUser
}
export const Quiz = ({ title, description, questions=[], min=questions.length*.7, next, approve, user }: iQuiz) =>  {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    const [isActive, setActive] = useState(false)
    const [values, setValues] = useState<{[idx:number]:number}>(
        questions.reduce((d, _, idx) => ({...d, [idx]: -1 }), {})
    )

    const [score, setScore] = useState<number>() 
    const [approved, setApproved] = useState<boolean>()
    const submit = async() => {

        const answers = Object.entries(values).map(([k, v]) => 
            !questions[k as unknown as number].answers[v].sign && !questions[k as unknown as number].answers[v].house
            ?   questions[k as unknown as number].answers[v].value
            :   questions[k as unknown as number].answers[v].sign
                ?   questions[k as unknown as number].answers[v].sign === user.sign
                :   questions[k as unknown as number].answers[v].house === user.house
        )

        console.log('answers', answers)

        const score = answers.filter(a=>a).length
        setScore(score)

        const isApproved = await approve({score}) || false
        setApproved(isApproved)

        setActive(true)

        try { amplitude.getInstance().logEvent('ASTRO_QUIZ', {title, answers, score, isApproved}) } catch(e) {}
    }

    const modalClick = () => {
        next()
        setActive(false)
        if(user.quizFailures === 1) setValues(questions.reduce((d, _, idx) => ({...d, [idx]: -1 }), {}))
    }

    return <div className='content'>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto 2rem',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 660 : 320        
            }}
        > { description ? description.map(p => <span> { p } <br/><br/> </span>) : '' } </h3>

        <div style={{ width: midScreen ? 880 : 'auto', margin:'auto' }}>
            {
                questions.map((q, i) => 
                    <Question 
                        {...q}
                        key={i} 
                        index={i}
                        user={user}
                        value={values[i]}
                        select={(idx, i) => setValues({...values, [idx]:i})}
                    />
                )
            }
        </div>


        <button 
            className='button is-link' 
            style={{
                borderRadius:12, 
                width:180, 
                fontSize:'1.25rem', 
                fontWeight:600, 
                marginBottom:'4em', 
                backgroundColor:'saddlebrown'
            }}
            disabled={Object.values(values).some(a => a === -1)}
            onClick={submit}
        > ENVIAR </button>

        <Modal 
            isActive={isActive} 
            questions={questions}
            deactivate={()=> setActive(false)}

            score={score as number}
            approved={approved as boolean}
            min={min}
            user={user}

            next={modalClick}
        />
    </div>
}
