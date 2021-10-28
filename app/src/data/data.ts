import { iRecordings } from "../components/Forum/Recordings"
import { iLesson, iUnit } from "../components/LayOut/Menu"
import { iForum } from "../components/Forum/Forum"
import { iPost } from "../components/Forum/Posts"
import { planets, houses } from './chart'
import { iUser } from "../App"


export const defaultUser:iUser = { 
    sign:'Leo',
    user_id:'0',
    quizFailures:0,
    name:'Santiago M.',
    location:'Mexico City',
    email:'test@branding.gq', 
    date:new Date(1988,7,17,12,37),
    natalChart:{ planets, houses },
    current:{unit:3, module:0, lesson:1}, 
    progress:{unit:3, module:0, lesson:5}, 
}


export const lesson: iLesson = { 
    title:'Quiz', 
    description:'El signo solar indica el caracter, la escencia y misión de la persona.', 
    type:'Quiz', 
    questions:[{
        question:'First Question?', 
        answers:[
            { answer:'Answer a', value:false },
            { answer:'Answer b', value:true }
        ]
    }, {
        question:'Second Question?', 
        answers:[
            { answer:'Answer a', value:false },
            { answer:'Answer b', value:true }
        ]
    }],
    min:1,
    link:'https://www.youtube.com/watch?v=8u9sRggTos8'
}


export const Forum:iForum = { 
    user:defaultUser,
    title:'Portal de Dudas', 
    description:'Comparte las dudas y preguntas que quieras que sean respondidas en la sesión semanal.', 
    questions:[{ 
        question: '¿Qué significa cuando el Sol está en Leo?', 
        details: 'Mi carta tiene el Sol en Leo y no se que significa.',
        likes: []
    }, { 
        question: 'Cómo afecta la Luna en Cancer mis emociones?', 
        details: 'Mi carta tiene la Luna en Cancer cual es el efecto en mis emociones.',
        likes: []
    }] 
}


export const Recordings:iRecordings = { 
    title:'Grabaciones Semanales', 
    description:'Todos los Miércoles nos reunimos por Zoom para resolver sus dudas, estás son las grabaciones de la anteriores.', 
    recordings:[{ 
        title: 'Marzo 28: El Sol y los Signos', 
        link:'https://www.youtube.com/watch?v=BPwn_iCi7BQ', 
        description: 'Aclaramos lo que signfica tu signo solar, la casa y como trabajar las energias.' 
    },  { 
        title: 'Abril 3: La Luna y el Karma', 
        link:'https://www.youtube.com/watch?v=BPwn_iCi7BQ', 
        description: 'Como puedes utilizar el poder de manifestación de las emociones para materializar un presente abundante.' 
    }] 
}


const longDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const lessons:iLesson[] = [
    {...lesson, type:'Video', title:'Video'}, 
    {...lesson, type:'Reading', title:'Lectura', description:longDescription, link:'sample.pdf'}, 
    lesson
]

export const Posts:iPost[] = [{
    name:'Alice',
    title:'Title', 
    image:'Pis',
    detail:'Detail', 
    comments:[
        {name:'Beth', image:'Aqu', comment:'Test'} 
    ],
    likes: []
}]


const module11:iLesson[] = [
    { type:'Video', title:'¿Qué es Saturno?', description:'' },
    { type:'Quiz', title:'Quiz', description:'' },
    { type:'Video', title:'La importancia de Saturno', description:'' },
    { type:'Quiz', title:'Ejercicio: Reflexión', description:'' },
]


const module12:iLesson[] = [
    { type:'Video', title:'El Karma', description:'' },
    { type:'Quiz', title:'Quiz', description:'' },
    { type:'Reading', title:'Saturno en la Astrología', description:'' },
    { type:'Video', title:'Saturno, el maestro', description:'' },
    { type:'Quiz', title:'Ejercicio: Compartir', description:'' },
]

const module13:iLesson[] = [
    { type:'Video', title:'Las lecciones de Saturno', description:'' },
    { type:'Quiz', title:'Quiz', description:'' },
    { type:'Video', title:'Escucha las señales', description:'' },
    { type:'Quiz', title:'Ejercicio: Compartir', description:'' }
]


export const Units:iUnit[] = [{ 
    title: '1. Saturno y el Karma', 
    modules: [
        { title: '1.1 La importancia de Saturno', lessons:module11 },
        { title: '1.2 El Karma y Saturno', lessons:module12 },
        { title: '1.3 Las lecciones de Saturno', lessons:module13 }
    ]
}, { 
    title: '2. El Signo de Saturno', 
    modules: [
        { title: '2.1 El significado del signo de tu Saturno', lessons },
        { title: '2.2 La misión de tu Saturno', lessons },
        { title: '2.3 Tus vidas pasadas', lessons }
    ] 
}, { 
    title: '3. La Casa de Saturno', 
    modules: [
        { title: '3.1 La casa de tu Saturno', lessons },
        { title: '3.2 El ciclo de 7 años de Saturno', lessons },
        { title: '3.3 Saturno y la Salud.', lessons }
    ] 
}, { 
    title: '4. Saturno y la Kabbalah', 
    modules: [
        { 
            title: '4.1 Binah y el inicio de la existencia', 
            lessons:[
                { title:'Saturno', type:'Chart', description:'El planeta que rige tu responsabilidad', planet:'Saturn'},
                ...lessons
            ] 
        },
        { title: '4.2 Saturno desde la Kabbalah', lessons },
        { title: '4.3 El COVID y Saturno en Acuario', lessons }
    ] 
}]
