interface iHeader { title:string, midScreen:boolean, description:string }
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
</>
