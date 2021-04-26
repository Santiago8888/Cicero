interface iDocument { title:string, link:string, description:string }
export const Document = ({ title, link, description }:iDocument) => <div className="content">
    <h1> { title } </h1>
    <p> { description } </p>
    <a target='_blank' rel='noreferrer' href={link} style={{padding:0}} className='button'>
        Leer
    </a>
</div>
