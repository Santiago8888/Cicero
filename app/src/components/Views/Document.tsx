import { useMediaQuery } from 'react-responsive'
import { iApprove, iUser } from '../../App'
import { questionStyle } from './Quiz'
import { useState } from 'react'



interface iDocument { 
    user:iUser
    title:string
    link?:string
    description?:string[]
    min?:number
    next():void
    approve(props:iApprove):boolean | void 
}


export const Document = ({ user, title, link='', description, min, next, approve }:iDocument) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    
    const [ isCounting, setCounting ] = useState(false)
    const initCountdown = () => {
        setCounting(true)
        setTimeout(() => approve({}), 1000*60*(min || 10))
    }

    return <div className='content'>
        <h1 
            style={{
                fontSize: midScreen ? '3rem' : '2rem', 
                marginBottom: midScreen ? '2rem' : '1rem', 
                color:'saddlebrown'
            }}
        > { title } </h1>

        <hr 
            style={{ 
                backgroundColor:'darkolivegreen', 
                margin: midScreen ?  '3rem auto' : '1.5rem auto', 
                width:midScreen ? 600 : 280 
            }}
        />

        <div style={{...questionStyle, padding:'0px 24px', maxWidth:720}}>
            { description?.map((p) => 
                <p style={{fontSize:'1.25rem', margin:'2rem auto'}}> { p }  </p>
            )}
        </div>

        <div style={{ width:midScreen ? 800 : 280, margin:midScreen ? '3rem auto' : '1.5rem auto'}}>
            {
                user.current.module < user.progress.module 
                || (user.progress.lesson < user.current.lesson && user.current.module === user.progress.module)
                || !isCounting
                ?
                    <a 
                        onClick={initCountdown}
                        target='_blank'
                        rel='noreferrer'
                        href={link}
                        className='button is-link'
                        style={{
                            borderRadius:12,
                            width:180,
                            fontSize:'1.25rem',
                            fontWeight:600,
                            backgroundColor:'saddlebrown'
                        }}
                    > Leer </a>
                :
                    <button 
                        onClick={next}
                        className='button is-link'
                        style={{
                            borderRadius:12, 
                            width:180, 
                            fontSize:'1.25rem', 
                            fontWeight:600, 
                            backgroundColor:'saddlebrown'
                        }}
                        disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
                    > CONTINUAR </button>
            }
        </div>
    </div>
}
