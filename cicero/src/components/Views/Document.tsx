const defaultDoc = ''

interface iDocument { title:string, link?:string, description:string, next():void }
export const Document = ({ title, link=defaultDoc, description, next }:iDocument) => <div className="content">
    <h1> { title } </h1>
    <p> { description } </p>

    <a target='_blank' rel='noreferrer' href={link} style={{padding:0}} className='button'>
        Leer
    </a>

    <a className='button' onClick={next}> Siguiente </a>
</div>
