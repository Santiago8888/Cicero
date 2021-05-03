import Vimeo from '@u-wave/react-vimeo'
import { iUser } from '../../App'
import { useMediaQuery } from 'react-responsive'

const defaultVideo = ''
interface iVideo { user:iUser, title:string, link?:string, description:string, next():void, approve():boolean | void}
export const Video = ({ user, title, link=defaultVideo, description, next, approve }: iVideo) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

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

        <Vimeo 
            video={link} 
            onEnd={approve} 
            width={midScreen ? 800 : !smallScreen ? 540 : 300 } 
            height={midScreen ? 400 : !smallScreen ? 300 : 200 }
        />
        <div style={{ marginTop:'3rem', width: midScreen ? 800 : 320, margin:'auto'}}>
            <button
                onClick={next} 
                className='button is-link' 
                style={{
                    float: !midScreen ? 'inherit' : 'right', 
                    borderRadius:12, 
                    width:180, 
                    fontSize:'1.25rem', 
                    fontWeight:600, 
                    backgroundColor:'darkblue'
                }}
                disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
            > CONTINUAR </button>
        </div>
    </div>
}
