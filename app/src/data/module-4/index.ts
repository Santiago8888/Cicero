import { iLesson } from '../../components/LayOut/Menu'
import { posts1, posts2 } from './posts'
import { quiz1 } from './quiz1'


const lessons1:iLesson[] = [
    { type:'Video', title:'Introducción a la Kabbalah', link:'https://youtu.be/9bjn7W2F-KM' },
    { type:'Quiz', title:'Quiz 4.1', questions:quiz1 },
    { type:'Reading', title:'Shabbat' },
    { type:'Video', title:'La Apreciación', link:'https://youtu.be/esiDMjWW2Fk' },
    { type:'Reflection', title:'Ejercicio de Reflexión', posts:posts1, numbered:true }
]

const lessons2:iLesson[] = [
    { type:'Video', title:'El Camino de la Manifestación', link:'https://youtu.be/votYUa9V12c' },
    { type:'Quiz', title:'Examen Final', questions:[] },
    { type:'Reading', title:'La Llave de la Creación' },
    { type:'Video', title:'Mi Misión Espiritual', link:'https://youtu.be/uE7kmnAwLhw' },
    { type:'Reflection', title:'Ejercicio de Compartir', posts:posts2 }
]

const lessons3:iLesson[] = [
    { type:'Video', title:'Saturno y el COVID', link:'https://youtu.be/QnQr0FDW5gI' },
    { type:'Reflection', title:'Reflexión de la Era de Acuario' },
    { type:'Video', title:'Meditación', link:'https://youtu.be/BljfRq4j2uY' },
    { type:'Reading', title:'Siguientes Pasos' },
    { type:'Reflection', title:'Ejercicio Final' },
]


export const module4 = [
    { title: '4.1 Saturno en la Kabbalah', lessons:lessons1 },
    { title: '4.2 Binah y el Inicio de la Existencia', lessons:lessons2 },
    { title: '4.3 Saturno en Acuario', lessons:lessons3 }
]
