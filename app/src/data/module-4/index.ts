import { iLesson } from '../../components/LayOut/Menu'
import { posts1, posts2 } from './posts'
import { quiz1 } from './quiz1'
import { quiz2 } from './quiz2'


const lessons1:iLesson[] = [
    { type:'Video', title:'Introducción a la Kabbalah', link:'https://youtu.be/9bjn7W2F-KM' },
    { type:'Quiz', title:'Quiz 4.1', questions:quiz1 },
    { type:'Video', title:'La Apreciación', link:'https://youtu.be/esiDMjWW2Fk' },
    { type:'Reflection', title:'Ejercicio de Reflexión', posts:posts1, numbered:true }
]


const description2 = [
    'Esta lectura te enseña el proceso para materializar una idea, pensamiento o deseo utiliza las herramientas de la Kabbalah.', 
    'Es una técnica que puedes utilizar a cada momento de tu vida, y entre más la practiques más fácil te será utilizarla.',
    'Tiempo mínimo de lectura sugerido: 6 minutos.',
]

const lessons2:iLesson[] = [
    { type:'Video', title:'El Camino de la Manifestación', link:'https://youtu.be/votYUa9V12c' },
    { type:'Quiz', title:'Examen Final', questions:quiz2 },
    { type:'Reading', title:'La Llave de la Creación', link:'docs/La-Llave-de-la-Creación.pdf', min:6, description:description2 },
    { type:'Video', title:'Mi Misión Espiritual', link:'https://youtu.be/uE7kmnAwLhw' },
    { type:'Reflection', title:'Ejercicio de Compartir', posts:posts2, numbered:true }
]


const description3 = [
    'Respetar el Shabbat es una de las prácticas más poderosas de la Kabbalah',
    'Durante el Shabbat se estudia, descansa y disfruta con el propósito de elevar nuestra conciencia espiritual. Conoce más sobre la práctica del Shabbat en esta lectura.',
    'Tiempo mínimo sugerido: 3 minutos.'
]

const lessons3:iLesson[] = [
    { type:'Reading', title:'Shabbat', link:'docs/Shabbath.pdf', min:3, description:description3 },
    { type:'Video', title:'Saturno y el COVID', link:'https://youtu.be/QnQr0FDW5gI' },
    { type:'Reflection', title:'Reflexión de la Era de Acuario' },
    { type:'Video', title:'Meditación', link:'https://youtu.be/BljfRq4j2uY' },
    { type:'Reading', title:'Siguientes Pasos' },
    { type:'Reflection', title:'Ejercicio Final', end:true, disabled:true },
]


export const module4 = [
    { title: '4.1 Saturno en la Kabbalah', lessons:lessons1 },
    { title: '4.2 Binah y el Inicio de la Existencia', lessons:lessons2 },
    { title: '4.3 Saturno en Acuario', lessons:lessons3 }
]
