import { useMediaQuery } from 'react-responsive'
import { CSSProperties } from 'react'


const descriptionStyle:CSSProperties = {
    margin:'0rem auto',
    color: '#333',
    fontSize: '1.25em',
    textAlign: 'left',
    fontWeight: 500,
}

const buttonStyle:CSSProperties = {
    width:240, 
    fontWeight:600, 
    borderRadius:12, 
    marginTop:'1.5em', 
    fontSize:'1.25rem', 
    marginBottom:'1.5em',
    backgroundColor:'darkblue'
}

const dividerStyle = { backgroundColor:'darkblue', margin:'1.5rem auto 3rem' }
interface iHeader { title:string, description:string, submit():void }
export const Header = ({ title, description, submit }:iHeader) => {
    const midScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div>
        <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> 
            { title } 
        </h1>

        <h3 style={{...descriptionStyle, width:midScreen ? 800 : 320}}> 
            { description } 
        </h3>


        <div style={{maxWidth:800, margin:'auto'}}>
            <button className='button is-link' style={buttonStyle} onClick={submit}> 
                Haz una Pregunta 
            </button>
        </div> 
        
        <hr style={{...dividerStyle, width:midScreen ? 600 : 320 }}/>
    </div>
}

