import Vimeo from '@u-wave/react-vimeo'
import { iUser } from '../../App'

const defaultVideo = ''
interface iVideo { user:iUser, title:string, link?:string, description:string, next():void, approve():boolean | void}
export const Video = ({ user, title, link=defaultVideo, description, next, approve }: iVideo) => <div className="content">
    <h1> { title } </h1>
    <p> { description } </p>

    <Vimeo video={link} onEnd={approve}/>
    <a 
        className='button' 
        onClick={next} 
        hidden={user.current.module > user.progress.module && user.progress.lesson > user.current.lesson}
    > Siguiente </a>
</div>
