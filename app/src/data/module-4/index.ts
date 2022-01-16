import { iLesson } from '../../components/LayOut/Menu'


const lessons1:iLesson[] = [
    { type:'Video', title:'Introducción a la Kabbalah', link:'https://youtu.be/9bjn7W2F-KM' },
    { type:'Video', title:'Saturno en el Árbol de la Vida', link:'https://youtu.be/jPLDQQq_CfM' },
]

const lessons2:iLesson[] = [
    { type:'Video', title:'La Apreciación', link:'https://youtu.be/esiDMjWW2Fk' },
    { type:'Video', title:'Mi Misión Espiritual', link:'https://youtu.be/uE7kmnAwLhw' },
]

const lessons3:iLesson[] = [
    { type:'Video', title:'Saturno en Acuario', link:'https://youtu.be/QnQr0FDW5gI' },
    { type:'Video', title:'Meditación Final', link:'https://youtu.be/BljfRq4j2uY' },
]


export const module4 = [
    { title: '4.1 Saturno en la Kabbalah', lessons:lessons1 },
    { title: '4.2 Binah y el inicio de la existencia', lessons:lessons2 },
    { title: '4.3 Saturno en Acuario y El COVID', lessons:lessons3 }
]
