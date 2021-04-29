import Vimeo from '@u-wave/react-vimeo'
import { iUser } from '../../App'

const defaultVideo = ''
interface iVideo { user:iUser, title:string, link?:string, description:string, next():void, approve():boolean | void}
export const Video = ({ user, title, link=defaultVideo, description, next, approve }: iVideo) => <div className="content">
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

    <Vimeo video={link} onEnd={approve} width={800} height={400}/>
    <div style={{ marginTop:'3rem', width:800, margin:'auto'}}>
        <button
            onClick={next} 
            className='button is-link' 
            style={{float:'right', borderRadius:12, width:180, fontSize:'1.25rem', fontWeight:600, backgroundColor:'darkblue'}}
            disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
        > CONTINUAR </button>
    </div>
</div>
