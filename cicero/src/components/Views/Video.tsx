
const defaultVideo = ''
interface iVideo { title:string, link?:string, description:string, next():void }
export const Video = ({ title, link=defaultVideo, description, next }: iVideo) => <div className="content">
    <h1> { title } </h1>
    <p> { description } </p>

    <iframe src={ link } width="600" height="338" frameBorder="0" allowFullScreen/>
    <a className='button' onClick={next}> Siguiente </a>
</div>
