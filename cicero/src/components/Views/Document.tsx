import { iUser } from '../../App'

const defaultDoc = ''

interface iDocument { 
    user:iUser
    title:string
    link?:string
    description:string
    min?:number
    next():void
    approve():boolean | void 
}


export const Document = ({ user, title, link=defaultDoc, description, min, next, approve }:iDocument) => {
    const initCountdown = () => setTimeout(() => approve(), 1000*60*(min || 10))

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'left',
                fontWeight: 500,
                width: 800        
            }}
        > { description } </h3>


        <div style={{ width:800, margin:'3rem auto 1rem'}}>
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
                    marginLeft:90,
                    backgroundColor:'darkblue'
                }}
            >
                Leer
            </a>

            <button 
                onClick={next} 
                className='button is-link' 
                style={{float:'right', borderRadius:12, width:180, fontSize:'1.25rem', fontWeight:600, backgroundColor:'darkblue'}}
                disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
            > CONTINUAR </button>
        </div>
    </div>
}
