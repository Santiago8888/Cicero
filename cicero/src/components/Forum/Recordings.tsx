import { cardStyle, headerStyle } from "./Forum"

interface iRecording { title:string, link:string, description:string }
const Recording = ({ title, link, description }: iRecording) => <div className='card' style={cardStyle}>
    <header className='card-header' style={headerStyle}>
        <p className='card-header-title' style={{color:'white', fontSize:'1.25rem'}}> { title } </p>
    </header>

    <article className='media' style={{marginBottom:0}}>
        <figure className='media-left' style={{width:'40%', height:256}}>
            <iframe src={ link } width="600" height="338" frameBorder="0" allowFullScreen/>
        </figure>

        <div className='media-content' style={{paddingBottom:'0.5rem', paddingRight:'1rem'}}>
            <div className='content'>
                <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
                    { description } 
                </div>
            </div>
         </div>
    </article>
</div>


export interface iRecordings { title:string, description:string, recordings:iRecording[] }
export const Recordings = ({ title, description, recordings}: iRecordings) => <div className="content">
    <h1> { title } </h1>
    <p> { description } </p> 

    { recordings.map((r, i)=> <Recording {...r} key={i}/>) }
</div>
