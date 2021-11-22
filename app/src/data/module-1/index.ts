import { iLesson } from '../../components/LayOut/Menu'
import { posts11, posts12, posts13 } from './posts'
import { quiz11 } from './quiz1'
import { quiz12 } from './quiz2'
import { quiz13 } from './quiz3'


const module11:iLesson[] = [
    { 
        type:'Video', 
        title:'Introducción', 
        link:'https://youtu.be/3OgHuaqYYWk', 
        description:['¡Hola! En este vídeo te voy a mostrar cómo funciona la plataforma:']  
    }, { 
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
    { 
        type:'Reflection', 
        title:'Preguntas de Reflexión', 
        numbered:true, 
        description:['Te invitamos a que realices una pausa y reflexiones sobre alguna de estás preguntas. Si gustas puedes visitar el Chat y compartir tu experiencia en base a alguno de estos temas.'], 
        posts:posts11 
    },
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


export const module1 = [
    { title: '1.1 La importancia de Saturno', lessons:module11 },
    { title: '1.2 Saturno y el Karma', lessons:module12 },
    { title: '1.3 Las lecciones de Saturno', lessons:module13 }
]
