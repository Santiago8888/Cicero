import { useMediaQuery } from 'react-responsive'
import { iApprove, iUser } from '../../App'
import { useState } from 'react'

const defaultDoc = ''

interface iDocument { 
    user:iUser
    title:string
    link?:string
    description?:string[]
    min?:number
    next():void
    approve(props:iApprove):boolean | void 
}


export const Document = ({ user, title, link=defaultDoc, description, min, next, approve }:iDocument) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    
    const [ isCounting, setCounting ] = useState(false)
    const initCountdown = () => {
        setCounting(true)
        setTimeout(() => approve({}), 1000*60*(min || 10))
    }

    return <div className='content'>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> { title } </h1>
        <hr style={{ backgroundColor:'darkolivegreen', margin:' 3rem auto', width:midScreen ? 600 : 320 }}/>

        <h3 
            style={{
                margin:'0rem auto',
                color: '#444',
                fontSize: '1.25em',
                fontWeight: 500,
                width: midScreen ? 640 : 320        
            }}
        > { description?.map((p) => <> { p } <br/></>) } </h3>


        <div style={{ width:midScreen ? 800 : 320, margin:'3rem auto 1rem'}}>
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
