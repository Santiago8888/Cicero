interface iVideo { title:string, src:string, description:string, next():void }
export const Video = ({ title, src, description, next }: iVideo) => <div className="content">
    <h1> { title } </h1>
    <p> { description } </p>

    <iframe src={ src } width="600" height="338" frameBorder="0" allowFullScreen/>
    <a className='button'> onClick={next} Siguiente </a>
</div>
