import { AstralChart } from '../Astral/AstralChart'
import { houses, planets } from '../../data/chart'
import { useMediaQuery } from 'react-responsive'
import { iUser } from '../../App'


interface iChart { user:iUser, title:string, description:string, next():void }
export const Chart = ({ user, title, description, next }: iChart) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 800 : 320        
            }}
        > { description } </h3>

        <AstralChart planets={planets} houses={houses}/>

        <div style={{ marginTop:'3rem', width: midScreen ? 800 : 320, margin:'auto'}}>
            <button
                onClick={next} 
                className='button is-link' 
                style={{
                    float: !midScreen ? 'inherit' : 'right', 
                    borderRadius:12, 
                    width:180, 
                    fontSize:'1.25rem', 
                    fontWeight:600, 
                    backgroundColor:'darkblue'
                }}
                disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
            > CONTINUAR </button>
        </div>
    </div>
}
