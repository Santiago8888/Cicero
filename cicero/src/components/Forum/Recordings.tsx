import Vimeo from '@u-wave/react-vimeo'

interface iRecording { title:string, link:string, description:string }
const Recording = ({ title, link, description }: iRecording) => <div style={{maxWidth:800, textAlign:'left', margin:'auto', marginBottom:'1.5em'}}>
    <p style={{color:'darkblue', fontSize:'1.25rem', fontWeight:600, marginBottom:0}}> { title } </p>

    <article className='media' style={{marginBottom:0}}>
        <Vimeo video={link} width={400} height={200}/>

        <div className='media-content' style={{paddingBottom:'0.5rem', paddingRight:'1rem', marginLeft:'1rem'}}>
            <div className='content'>
                <div className='content' style={{color:'gray', marginTop:'1rem'}}> 
                    { description } 
                </div>
            </div>
         </div>
    </article>
</div>


export interface iRecordings { title:string, description:string, recordings:iRecording[] }
export const Recordings = ({ title, description, recordings}: iRecordings) => <div className="content">
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

    <hr style={{ backgroundColor:'darkblue', margin:'1.5rem auto 3rem', width:600 }}/>


    { recordings.map((r, i)=> <Recording {...r} key={i}/>) }
</div>
