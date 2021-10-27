import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/youtube'

interface iRecording { title:string, link:string, description:string }
const Recording = ({ title, link, description }: iRecording) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div style={{width:midScreen ? 800 : 450, textAlign:'left', margin:'auto', marginBottom:'1.5em'}}>
        <p style={{color:'darkblue', fontSize:'1.25rem', fontWeight:600, marginBottom:0, textAlign: midScreen ? 'initial' : 'center'}}> 
            { title } 
        </p>

        <article className='media' style={{marginBottom:0}}>
            <ReactPlayer controls url={link} width={400} height={200} style={midScreen ? {} : {margin:'auto'}} />

            {
                midScreen && 
                <div className='media-content' style={{paddingBottom:'0.5rem', paddingRight:'1rem', marginLeft:'1rem', width:400}}>
                    <div className='content'>
                        <div className='content' style={{color:'gray', marginTop:'1rem'}}> 
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
export const Recordings = ({ title, description, recordings}: iRecordings) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <div className="content">
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> { title } </h1>
        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: '1.25em',
                textAlign: 'left',
                fontWeight: 500,
                width: midScreen ? 800 : !smallScreen ? 540 : 320
            }}
        > { description } </h3>

        <hr style={{ backgroundColor:'darkblue', margin:'1.5rem auto 3rem', width:midScreen ? 600 : 320 }}/>


        { recordings.map((r, i)=> <Recording {...r} key={i}/>) }
    </div>
}
