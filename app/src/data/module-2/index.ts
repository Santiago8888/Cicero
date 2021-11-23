import { iLesson } from '../../components/LayOut/Menu'
import { posts1, posts2 } from './posts'
import { quiz2 } from './quiz2'
import { quiz1 } from './quiz1'


const posts1Description = ['Nuevamente, te invitamos a que compartas tu experiencia con los demás, también puedes dar like y comentar en la experiencia de los otros.']
const lessons1:iLesson[] = [
    { title:'El signo de tu Saturno', type:'Chart', planet:'Saturn', drawHouses:false },
    { type:'Video', title:'El significado del signo', link:'https://youtu.be/uJP6kRJq9Qs' }, 
    { type:'Quiz', title:'Quiz 2.1', questions:quiz1 }, 
    { type:'Video', title:'Tus vidas pasadas', link:'https://youtu.be/qR1KmIG5Fl0' },
    { type:'Reflection', title:'Ejercicio de Compartir', posts:posts1, numbered:true, description:posts1Description }
]


const posts2Description = ['En base al vídeo "La Misión de Saturno" toma un tiempo para reflexionar y encontrar o reafirmar tu misión de servicio:']
const karmaDescription = [
    'En esta lectura conoceras a profundidad tu karma de Saturno, lo que te esta restringiendo y que vienes a aprender.',
    '',
    'Obtendrás un vistazo a tus vidas pasadas de acuerdo al signo de Saturno y algunas de las circunstancias que te hicieron desarrollar tu karma.',
    '',
    'Tiempo mínimo sugerido: 4 minutos'
]

const lessons2:iLesson[] = [
    { type:'Video', title:'La influencia de tu signo', link:'https://youtu.be/k5oxhnHwYWQ' }, 
    { type:'Reading', title:'Saturno en DYNAMIC_SIGN', link:'docs/Karma-de-Saturno-en-Aries.pdf', description:karmaDescription },
    { type:'Quiz', title:'Quiz 2.2', questions:quiz2 }, 
    { type:'Video', title:'La misión de Saturno', link:'https://youtu.be/iLpqbBzRIvk' },
    { type:'Reflection', title:'Preguntas de Reflexión', posts:posts2, numbered:true, description:posts2Description }
]


const lessons3:iLesson[] = [
    { type:'Video', title:'Ser un buen ejemplo', link:'https://youtu.be/MjU_S2C_cqc' },
    { type:'Video', title:'El camino de retorno', link:'https://youtu.be/_XjOhM-i9NA' },
]

export const module2 = [
    { title: '2.1 Saturno y tus vidas pasadas', lessons:lessons1 },
    { title: '2.2 La misión de Saturno', lessons:lessons2 },
    { title: '2.3 El camino de retorno', lessons:lessons3 }
]
