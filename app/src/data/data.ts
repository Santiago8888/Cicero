import { iRecordings } from "../components/Forum/Recordings"
import { iLesson, iUnit } from "../components/LayOut/Menu"
import { iQuestion } from "../components/Views/Quiz"
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

const quiz11:iQuestion[] = [
    { 
        question:'1. ¿Qué indica Saturno en la carta astral?', 
        answers:[
            { answer:'Como encontrar abundancia', value: false },
            { answer:'Si tienes tiempo o se te acabo el tiempo', value: true },
            { answer:'Nuestra espiritualidad y conexión con la fuente dívina', value: false },
            { answer:'Lo que amamos y nos hace felices', value: false }
        ] 
    }, { 
        question:'2. ¿Cuando nos indica Saturno que es tiempo de cambios?', 
        answers:[
            { answer:'Cada que llega al signo de Acuario', value: false },
            { answer:'Durante la infancia y adolescencia', value: false },
            { answer:'Aproximadamente cada siete años', value: true },
            { answer:'A los 42 cuando se junta con Urano', value: false }
        ] 
    }, { 
        question:'3. ¿Cuál es uno de los principales mensajes de Saturno?', 
        answers:[
            { answer:'Disfruta la vida, se feliz', value: false },
            { answer:'Ama incondicionalmente', value: false },
            { answer:'Perdona al projimo', value: false },
            { answer:'Hazte responsable, madura', value: true }
        ] 
    }, { 
        question:'4. ¿Qué nos enseña Saturno?', 
        answers:[
            { answer:'Nuestros defectos y áreas de oportunidad', value: false },
            { answer:'La consecuencia de nuestras acciones', value: true },
            { answer:'El futuro y el pasado', value: false },
            { answer:'Como tomar el contral el control nuestra vida', value: false }
        ] 
    }, { 
        question:'5. ¿Cuál es la responsabilidad de Saturno?', 
        answers:[
            { answer:'Ponernos limites', value: true },
            { answer:'Elevar la consciencia cósmica', value: false },
            { answer:'Distinguir entre la verdad y la mentira', value: false },
            { answer:'Sostener la creación', value: false }
        ] 
    }, { 
        question:'6. ¿Todos tenemos el mismo Saturno?', 
        answers:[            
            { answer:'Solo al principio después cambia conforme a nuestra acciones.', value: false },
            { answer:'Si, Saturno forma parte de una conciencia universal.', value: false },
            { answer:'No, para cada uno fluye de forma diferente.', value: true },
            { answer:'Va cambiando, pero lo que esta bien y mal es igual para todos.', value: false }
        ] 
    }, { 
        question:'7. ¿Cuál es el objetivo final de tu Saturno?', 
        answers:[
            { answer:'Enseñarnos a dar un buen ejemplo en un área específica de la vida.', value: true },
            { answer:'Limitarnos para que no nos salgamos de control.', value: false },
            { answer:'Premiar a quienes se conectan con su ser divino interior.', value: false },
            { answer:'Llevar la contabilidad de tus acciones y karma.', value: false }
        ] 
    }
]


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
    { type:'Video', title:'¿Qué es Saturno?', description:'', link:'https://youtu.be/-AEpq9zauQ8'  },
    { type:'Quiz', title:'Quiz 1.1', description:'', questions:quiz11 },
    { type:'Video', title:'La importancia de Saturno', description:'', link:'https://youtu.be/gQarN9nNKdA' },
    { type:'Quiz', title:'Ejercicio de Reflexión', description:'' },
]


const module12:iLesson[] = [
    { type:'Video', title:'El Karma', description:'', link:'https://youtu.be/dNt2saEg8As' },
    { type:'Quiz', title:'Quiz 1.2', description:'' },
    { type:'Reading', title:'Saturno en la Astrología', description:'' },
    { type:'Video', title:'Saturno, el maestro', description:'', link:'https://youtu.be/uilBR7op_GY' },
    { type:'Quiz', title:'Ejercicio de Compartir', description:'' },
]

const module13:iLesson[] = [
    { type:'Video', title:'Las lecciones de Saturno', description:'', link:'https://youtu.be/H3xrXhqG5MY' },
    { type:'Quiz', title:'Quiz 1.3', description:'' },
    { type:'Video', title:'Escucha las señales', description:'', link:'https://youtu.be/_BqqI3A1SZY' },
    { type:'Quiz', title:'Ejercicio Final 1', description:'' }
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
