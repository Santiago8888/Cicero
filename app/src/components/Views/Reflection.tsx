import { useMediaQuery } from 'react-responsive'
import { questionStyle } from './Quiz'
import { iUser } from '../../App'
import { CSSProperties } from 'react'

interface iHeader extends iReflection { midScreen:boolean }
const Header = ({ title, midScreen, description=[] }:iHeader) => <>
    <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'saddlebrown'}}> { title } </h1>
    {
        description.map((sentence) => <h3 
        style={{
            margin:'0rem auto',
            color: '#333',
            fontSize: '1.25em',
            textAlign: 'center',
            fontWeight: 500,
            width: midScreen ? 720 : 320        
        }}
    > { sentence } </h3>
    )}

    <hr style={{ backgroundColor:'darkolivegreen', margin:' 3rem auto', width:midScreen ? 600 : 320 }}/>
</>

const CTA = ({ midScreen, user, text, next }:iCta) => <div style={{...styleCta, width:midScreen ? 800 : 320}}>
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
        disabled={user.current.module === user.progress.module && user.progress.lesson === user.current.lesson}
    > { text } </button>
</div>

interface iReflection { title:string, description?:string[], posts?:string[], user:iUser }
export const Reflection = (props:iReflection) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div className='content'>
        <Header {...props} midScreen={midScreen} />

        <div style={{...questionStyle, padding:'0px 24px'}}>
            { props.posts?.map((post, i) => 
                <p style={{fontSize:'1.25rem', margin:'2rem auto'}}> <strong> { i + 1 }. </strong> { post } </p>
            )}
        </div>

        <CTA midScreen={midScreen} text={'Visitar el foro'} next={() => {}} user={props.user}/>
    </div>
}
