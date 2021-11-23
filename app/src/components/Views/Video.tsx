import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/youtube'
import { iApprove, iUser } from '../../App'


interface iVideo { 
    user:iUser
    title:string
    link?:string
    description?:string[]
    next():void
    approve(props:iApprove):boolean | void
}


export const Video = ({ user, title, link='', description, next, approve }: iVideo) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    return <div className='content'>
        <h1 
            style={{
                fontSize:!smallScreen ? '3rem' : '2rem', 
                marginBottom:!smallScreen ? '2rem' : '0.5rem', 
                color:'saddlebrown'
            }}
        > { title } </h1>

        <h3 
            style={{
                margin:'0rem auto',
                color: '#333',
                fontSize: midScreen ? '1.25em' : '1.15em',
                textAlign: 'center',
                fontWeight: 500,
                width: midScreen ? 800 : 300        
            }}
        > { description ? description[0] : '' } </h3>

        <div style={{margin:midScreen ? '2.5em 0px' : '1rem 0px 1.5rem'}}>
            <ReactPlayer 
                url={link} 
                controls={true}
                onEnded={() => approve({})}
                style={{margin:'auto'}}
                width={midScreen ? 800 : !smallScreen ? 400 : 300 } 
                height={midScreen ? 450 : !smallScreen ? 225 : 170 } 
            />
        </div>        

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
                    backgroundColor:'saddlebrown'
                }}
                disabled={user.current.unit === user.progress.unit && user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
            > CONTINUAR </button>
        </div>
    </div>
}
