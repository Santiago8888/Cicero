interface iVideo { title:string, src:string, description:string }
const Video = ({ title, src, description }: iVideo) => <div className="content">
    <h1> { title } </h1>
    <iframe src={ src } width="600" height="338" frameBorder="0" allowFullScreen/>
    <p> { description } </p>
</div>
