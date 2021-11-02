import { useMediaQuery } from 'react-responsive'
import { questionStyle } from './Quiz'

interface iHeader extends iReflection { midScreen:boolean }
const Header = ({ title, midScreen, description }:iHeader) => <>
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
    > { description } </h3>

    <hr style={{ backgroundColor:'darkolivegreen', margin:' 3rem auto', width:midScreen ? 600 : 320 }}/>
</>

interface iReflection { title:string, description:string, posts?:string[] }
export const Reflection = (props:iReflection) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div className='content'>
        <Header {...props} midScreen={midScreen} />

        <div style={{...questionStyle, padding:'0px 24px'}}>
            { props.posts?.map(post => <p style={{fontSize:'1.25rem', margin:'2rem auto'}}> { post } </p>) }
        </div>
    </div>
}
