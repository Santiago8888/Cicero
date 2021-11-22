import { AstralChart, Planet } from '../Astral/AstralChart'
import { useMediaQuery } from 'react-responsive'
import { MiniChart } from '../Astral/MiniChart'
import { iApprove, iUser } from '../../App'
import { useEffect } from 'react'


interface iChart { 
    user:iUser
    title:string
    description?:string[]
    planet?:Planet
    drawHouses?:boolean
    approve(props:iApprove):boolean | void
    next():void 
}

export const Chart = ({ user:{ natalChart:{planets, houses}}, title, description, planet, drawHouses, next, approve }: iChart) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 680px)' })

    useEffect(() => { approve({}) }, [approve])

    return <div className='content'>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 800 : 320        
            }}
        > { description ? description[0] : '' } </h3>

        {
            !smallScreen
            ?   <AstralChart 
                    planets={planet ? planets.filter(({ name }) => name === planet) : planets} 
                    houses={houses}
                    drawHouses={drawHouses}
                />
            :   <MiniChart 
                    planets={planet ? planets.filter(({ name }) => name === planet) : planets} 
                    houses={houses}
                    drawHouses={drawHouses}
                />            
        }

        <div style={{ marginTop:'3rem', width: midScreen ? 800 : 320, margin:'auto'}}>
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
            > CONTINUAR </button>
        </div>
    </div>
}
