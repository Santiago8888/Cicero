import { iRecordings } from '../components/Forum/Recordings'
import { iLesson, iUnit } from '../components/LayOut/Menu'
import { quiz11, quiz12, quiz13 } from './module-1'
import { iForum } from '../components/Forum/Forum'
import { planets, houses } from './chart'
import { iUser } from '../App'

const defaultUser:iUser = { 
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
    title:'Foro de Dudas', 
    description:'Comparte las dudas y preguntas que quieras que sean respondidas en la sesión semanal.', 
    questions:[] 
}


export const Recordings:iRecordings = { 
    title:'Grabaciones Semanales', 
    description:'Todos los Jueves nos reunimos por Zoom para resolver tus dudas, estás son las grabaciones de la anteriores.', 
    recordings:[]
}


const lessons:iLesson[] = [
    {...lesson, type:'Video', title:'Video'}, 
    {...lesson, type:'Reading', title:'Lectura', link:'sample.pdf'}, 
    lesson
]


const posts11 = [
    'Saturno es un gran guía. Comparte la historia de un guía que te haya inspirado a ser mejor persona.',
    '¿Sabes en qué eres expert@? Cuéntanos en qué y cómo te volviste expert@ en eso.',
    'Relata una experiencia en la que hayas aprendido a través de la limitación.',
    'Para tí, ¿Qué es la humildad y cómo la practicas diariamente?',
    'Saturno nos pide que cada vez seamos mejores ¿En que te estás esforzando hoy para crecer como persona?',
    'Comparte una ocasión en la que hayas sido un buen ejemplo para alguien y que sensación te dejó.'
]

const module11:iLesson[] = [
    { type:'Video', title:'Introducción', link:'https://youtu.be/-AEpq9zauQ8', description:['¡Hola! En este vídeo te voy a mostrar cómo funciona la plataforma:']  },
    { 
        type:'Reading', 
        title:'Saturno en la Astrología', 
        link:'docs/Introduccion-a-Saturno-en-la-Astrología.pdf', 
        min:3,
        description:[
            'En esta primera lectura encontrarás todo lo que requieres saber para iniciar el curso.',
            ' ',
            'La lectura trata sobre los fundamentos de la Astrología, las características de Saturno, su simbolismo y algo de mitología.',
            ' ',
            'Después de dar click en "Leer" y una vez hayan transcurrido los 3 minutos sugeridos de lectura podrás continuar a ver el primer vídeo.'
        ] 
    },
    { type:'Video', title:'¿Qué es Saturno?', link:'https://youtu.be/-AEpq9zauQ8'  },
    { type:'Quiz', title:'Quiz 1.1', questions:quiz11 },
    { type:'Video', title:'La importancia de Saturno', link:'https://youtu.be/gQarN9nNKdA' },
    { type:'Reflection', title:'Preguntas de Reflexión', numbered:true, description:['Te invitamos a que realices una pausa y reflexiones sobre alguna de estás preguntas. Si gustas puedes visitar el Chat y compartir tu experiencia en base a alguno de estos temas.'], posts:posts11 },
]


const posts12:string[] = [
    '¿Quieres compartir alguna vez en que Saturno te haya dado avisos?',
    '¿Alguna vez te has sentido limitado o bloqueado? Cuéntanos cómo empezó esa sensación y si recibiste comentarios de personas a tu alrededor.',
    '¿Has recibido mensajes o señales recientemente? Cuéntanos cómo y cuáles:',
    '¿Tienes alguna experiencia curiosa o divertida de la manifestación de la ley de la causa y efecto?',
    '¿Te has aferrado a algo que no te deja crecer, qué pasó?',
    '¿Cómo te comunicas con tu alma?',
    '¿En qué área crees que puedes crecer actualmente?',
    '¿Para tí, qué es el entendimiento?',
    '¿De qué eres responsable el día de hoy?'
]


const module12:iLesson[] = [
    { type:'Video', title:'El Karma', link:'https://youtu.be/dNt2saEg8As' },
    { type:'Quiz', title:'Quiz 1.2', questions:quiz12 },
    { type:'Video', title:'Saturno, el maestro', link:'https://youtu.be/uilBR7op_GY' },
    { 
        type:'Reading', 
        title:'El Señor del Karma', 
        link:'docs/Saturno-Señor-del-Karma.pdf', 
        description:[
            'Esta lectura, profundiza en algunos conceptos del Karma',
            ' ',
            'En particular, explica el origen del karma, el rol que juega Saturno y el proceso de manifestación de las acciones.',
            ' ',
            'La lectura introduce los primeros de Kabbalah, que nos brindará conocimiento para trascender la influencia de los astros y no ser víctimas del destino.',
            ' ',
            'Tiempo mínimo sugerido: 5 minutos'
        ]
    }, { 
        type:'Reflection', 
        numbered:true,
        title:'Ejercicio de Compartir', 
        posts:posts12, 
        description:[
            `Te invitamos a que hagas una segunda pausa y reflexiones cómo se manifiesta el karma en tu vida.
            Nuevamente ponemos a tu disposición sugerencias para compartir en el chat.`
        ] 
    },
]


const posts13:string[] = [
    'Abre una nueva nota en tu celular, y cada día escribe 3 a 5 momentos en los que te hayas sentido limitad@ o bloquead@. Al final del día trata de:',
    '1. Identificar: la acción que ocasionó ese bloqueo, donde contribuiste a esa sensación de limitación.',
    '2. Suelta: regresa a tu centro, revisa tus pensamientos, emociones, intenciones y acciones. Procura evitar incurrir nuevamente en aquello que está sembrando la limitación.',
    '3. Entiende: solo cuando aceptas, tomas responsabilidad de tus acciones y reconocemos que somos la causa de sentirnos limitados podemos alinearnos con nuestra misión.',
    'Te invitamos a que realices el ejercicio durante una semana para identificar el mensaje te está dando Saturno actualmente.'
]

const module13:iLesson[] = [
    { type:'Video', title:'Las lecciones de Saturno', link:'https://youtu.be/H3xrXhqG5MY' },
    { type:'Quiz', title:'Quiz 1.3', questions:quiz13 },
    { type:'Video', title:'Escucha las señales', link:'https://youtu.be/_BqqI3A1SZY' },
    { 
        type:'Reflection', 
        title:'Ejercicio Práctico', 
        posts:posts13, 
        end:true,
        description:[
            '¡Felicidades! Has completado la primera lección.',
            `La segunda lección estará disponible el Jueves 25 a partir de las 9pm (CDMX) después del primer live.
            Por lo pronto, te invitamos a que realices este ejercicio práctico para trasladar tus nuevos conocimientos a tu vida diaria.`
        ] 
    }
]


export const Units:iUnit[] = [{ 
    title: '1. Saturno y el Karma', 
    modules: [
        { title: '1.1 La importancia de Saturno', lessons:module11 },
        { title: '1.2 Saturno y el Karma', lessons:module12 },
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
        { title: '3.2 Los ciclos de Saturno', lessons },
        { title: '3.3 Saturno y la Salud.', lessons }
    ] 
}, { 
    title: '4. Saturno y la Kabbalah', 
    modules: [
        { 
            title: '4.1 Binah y el inicio de la existencia', 
            lessons:[
                { 
                    title:'Saturno', 
                    type:'Chart', 
                    description:['El planeta que rige tu responsabilidad'], 
                    planet:'Saturn'
                },
                ...lessons
            ] 
        },
        { title: '4.2 Saturno desde la Kabbalah', lessons },
        { title: '4.3 El COVID y Saturno en Acuario', lessons }
    ] 
}]
