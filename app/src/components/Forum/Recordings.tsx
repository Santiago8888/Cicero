import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/youtube'

interface iRecording { title:string, link:string, description:string }
const Recording = ({ title, link, description }: iRecording) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div style={{width:midScreen ? 800 : 'auto', textAlign:'left', margin:'auto', marginBottom:'2.5em'}}>
        <p 
            style={{
                color:'saddlebrown', 
                fontSize:'1.25rem', 
                fontWeight:600, 
                marginBottom:'0.75rem', 
                textAlign: midScreen ? 'initial' : 'center'
            }}
        > { title } </p>

        <article className='media' style={{marginBottom:0}}>
            <ReactPlayer controls url={link} width={300} height={200} style={midScreen ? {} : {margin:'auto'}} />

            {
                midScreen && 
                <div 
                    className='media-content' 
                    style={{paddingBottom:'0.5rem', paddingRight:'1rem', marginLeft:'1rem', width:400}}
                >
                    <div className='content'>
                        <div className='content' style={{color:'#363636', marginTop:'1rem'}}> 
                            { description } 
                        </div>
                    </div>
                </div>
            }
        </article>

        {
            !midScreen && 
            <div className='content' style={{marginBottom:'2rem', maxWidth:400}}>
                <div className='content' style={{color:'gray', marginTop:'1rem'}}> 
                    { description } 
                </div>
            </div>
        }
    </div>
}


export interface iRecordings { title:string, description:string, recordings:iRecording[] }
export const Recordings = ({ title, recordings}: iRecordings) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <div className='content'>
        <h1 style={{fontSize:'3rem', marginBottom:'1.5rem', color:'saddlebrown'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#363636',
                fontSize: '1.25em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 640 : !smallScreen ? 540 : 320
            }}
        >
            En este espacio encontrarás las grabaciones para resolver las dudas. <span style={{fontWeight:400}}> 
            Recuerda que puedes asistir a los <i>lives</i> cada Jueves a las 7:30 pm (CDMX), del 25 de Noviembre al 16 de Diciembre. 
            </span> 
        </h3>

        <hr style={{ backgroundColor:'darkolivegreen', margin:' 3rem auto', width:midScreen ? 600 : 320 }}/>


        { recordings.map((r, i)=> <Recording {...r} key={i}/>) }
    </div>
}
