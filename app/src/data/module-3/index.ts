import { posts1 } from './posts'
import { iLesson } from '../../components/LayOut/Menu'
import { quiz1 } from './quiz1'

const posts1Description = ['Después de haber escuchado algunos ejemplos y características de la influencia de Saturno en las casas. Comparte tu experiencia con alguna de las siguientes preguntas sobre como ha influido Saturno en tu vida.']

const quiz31Description = [
    'Después de escuchar las explicaciones de las casas, te invitamos a que hagas una pausa y reflexiones sobre el estado actual de tu vida.',
    'No hay respuestas incorrectas, este es un ejercicio para que adquieras más consciencia sobre lo que te gusta y lo que te gustaría mejorar de tu vida presente.'
]

const lessons1:iLesson[] = [
    { type:'Video', title:'Las casas en la astrología', link:'https://youtu.be/bvQh_9PCos8' },
    { type:'Quiz', title:'Auto Diagnóstico', description:quiz31Description, questions:quiz1 },
    { type:'Video', title:'La influencia de Saturno', link:'https://youtu.be/JtfC2DSLxVE' },
    { type:'Reflection', title:'Ejercicio de Compartir', posts:posts1, numbered:true, description:posts1Description }
]

const lessons2:iLesson[] = [
    { type:'Video', title:'La casa de Saturno', link:'https://youtu.be/nPZtv_lKmKM' },
    { type:'Reading', title:'Saturno en la Casa XI', link:'docs/casas/Saturno-en-Casa-XI.pdf' },
    { type:'Video', title:'Los ciclos de Saturno', link:'https://youtu.be/Pu4X1ECLSjY' }
]

const lessons3:iLesson[] = [
    { type:'Video', title:'Los tránsitos de Saturno', link:'https://youtu.be/7sRKVAHorco' },
    { type:'Video', title:'Saturno y la Salud', link:'https://youtu.be/zenrgnOxS1A' },
]

export const module3 = [
    { title: '3.1 Saturno en tu vida', lessons:lessons1 },
    { title: '3.2 Armonizando a Saturno', lessons:lessons2 },
    { title: '3.3 Saturno y el tiempo', lessons:lessons3 }
]
