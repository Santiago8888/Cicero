import { AstralChart, iPlanet, Planet } from '../Astral/AstralChart'
import { iApprove, iUser } from '../../App'
import { useMediaQuery } from 'react-responsive'
import { MiniChart } from '../Astral/MiniChart'
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

const mapSign = (planet:iPlanet) => {
    const signs = [
        'Aries', 
        'Tauro', 
        'Géminis', 
        'Cancer', 
        'Leo', 
        'Virgo', 
        'Libra', 
        'Scorpio', 
        'Sagitario', 
        'Capricornio', 
        'Aquario', 
        'Piscis' 
    ]

    const sign = signs[planet.house - 1]
    return sign
}

const NatalData = ({ natalChart: { planets } }:iUser) => <span>
    Tu Saturno está en  { mapSign(planets.find(({ name }) => name === 'Saturn' ) as iPlanet) }
</span>

export const Chart = ({ user, title, description, planet, drawHouses, next, approve }: iChart) => {
    const { natalChart: { planets, houses } } = user 

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
        >  <NatalData {...user} /> </h3>

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

        <h3 
            style={{
                margin:'auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 800 : 320        
            }}
        >  Fecha de Nacimiento: {user.date.getMonth()}/{user.date.getDate()}/{user.date.getFullYear()} </h3>
        
        
        <div style={{ marginTop:'3rem', width: midScreen ? 800 : 320, margin:'auto'}}>
            <button
                onClick={next} 
                className='button is-link' 
                style={{
                    borderRadius:12, 
                    width:180, 
                    fontSize:'1.25rem', 
                    fontWeight:600, 
                    margin:'2rem',
                    backgroundColor:'saddlebrown'
                }}
            > CONTINUAR </button>
        </div>
    </div>
}
