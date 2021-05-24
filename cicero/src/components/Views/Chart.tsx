import { AstralChart, Planet } from '../Astral/AstralChart'
import { useMediaQuery } from 'react-responsive'
import { iUser } from '../../App'
import { useEffect } from 'react'


interface iChart { user:iUser, title:string, description:string, planet?:Planet, approve():boolean | void, next():void }
export const Chart = ({ user:{natalChart:{planets, houses}}, title, description, planet, next, approve }: iChart) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    useEffect(() => { approve() }, [approve])

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
            planets={planet ? planets.filter(({ name }) => name === planet) : planets} 
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
            > CONTINUAR </button>
        </div>
    </div>
}
