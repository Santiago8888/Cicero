import { houses, planets as planetsData } from '../../data/chart'
import { AstralChart, Planet } from '../Astral/AstralChart'
import { useMediaQuery } from 'react-responsive'
import { iUser } from '../../App'


interface iChart { user:iUser, title:string, description:string, planets?:Planet[], next():void }
export const Chart = ({ user, title, description, planets=[], next }: iChart) => {
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

        <AstralChart 
            planets={planets?.length ? planetsData.filter(({ name }) => planets?.includes(name)) : planetsData} 
            houses={houses}
        />

        <div style={{ marginTop:'3rem', width: midScreen ? 800 : 320, margin:'auto'}}>
            <button
                onClick={next} 
                className='button is-link' 
                style={{
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
