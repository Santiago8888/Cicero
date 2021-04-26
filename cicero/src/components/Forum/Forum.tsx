
const cardStyle = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

const headerStyle = { backgroundColor: 'rgb(72, 72, 72)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }

interface iQuestion { title:string, details:string }
const Question = ({ title, details }: iQuestion) => <div className='card' style={cardStyle}>
    <header className='card-header' style={headerStyle}>
        <p className='card-header-title' style={{color:'white', fontSize:'1.25rem'}}> { title } </p>
    </header>

    <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
        <p> { details } </p> 
    </div>
</div>

interface iForum { title:string, description:string, questions:iQuestion[] }
export const Forum = ({ title, description, questions }: iForum) => <div className="content">
    <h1> { title } </h1>
    <div className='columns' >
        <div className='column'>
            <p> { description } </p>
        </div>

        <div className='column'>
            <button className='button'> 
                Nueva Pregunta 
            </button>
        </div>
    </div>

    {
        questions.map((q, i) => 
            <Question  {...q} key={i}/>
        )
    }



</div>