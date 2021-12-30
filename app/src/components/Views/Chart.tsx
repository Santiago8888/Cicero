import { AstralChart, Planet } from '../Astral/AstralChart'
import { iApprove, iUser } from '../../App'
import { useMediaQuery } from 'react-responsive'
import { MiniChart } from '../Astral/MiniChart'
import { mapSigns } from '../../utils/sign'
import { useEffect } from 'react'
import { Approve } from '../Home'


interface iChart { 
    user:iUser
    title:string
    description?:string[]
    planet?:Planet
    drawHouses?:boolean
    approve(props:iApprove):Approve
    next():void 
}


const mapMonth = (n:Number|undefined) => {
    if(n === 0) return 'Enero'
    if(n === 1) return 'Febrero'
    if(n === 2) return 'Marzo'

    if(n === 3) return 'Abril'
    if(n === 4) return 'Mayo'
    if(n === 5) return 'Junio'

    if(n === 6) return 'Julio'
    if(n === 7) return 'Agosto'
    if(n === 8) return 'Septiembre'

    if(n === 9) return 'Octubre'
    if(n === 10) return 'Noviembre'
    if(n === 11) return 'Diciembre'

    return ''
}

const NatalData = ({ user:{ sign, house }, drawHouses  }:{ user:iUser, drawHouses?:boolean }) => sign ?
    <span>
        Tu Saturno está en  { mapSigns(sign) }{ drawHouses && house ? ` en la casa ${ house }` : '' }.
    </span>
    :
        <span>
            Favor de solicitar tu signo.
        </span>

export const Chart = ({ user, title, planet, drawHouses, next, approve }: iChart) => {
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
        >  <NatalData user={user} drawHouses={drawHouses} /> </h3>

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
        >  {
                user.birth
                    ? `Fecha de Nacimiento: ${user.birth.day} de ${mapMonth(user.birth.month)} de ${user.birth.year} a las ${user.birth.hour}:${user.birth.minute} pm.`
                    : ''
            }
        </h3>
        
        
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
