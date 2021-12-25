import { iLesson } from '../../components/LayOut/Menu'


const lessons1:iLesson[] = [
    { type:'Video', title:'Las casas astrológicas', link:'https://youtu.be/bvQh_9PCos8' },
    { type:'Video', title:'La influencia de Saturno', link:'https://youtu.be/JtfC2DSLxVE' }
]

const lessons2:iLesson[] = [
    { type:'Video', title:'La casa de Saturno', link:'https://youtu.be/nPZtv_lKmKM' },
    { type:'Video', title:'Los ciclos de Saturno', link:'https://youtu.be/Pu4X1ECLSjY' }
]

const lessons3:iLesson[] = []

export const module3 = [
    { title: '3.1 Las áreas de tu vida', lessons:lessons1 },
    { title: '3.2 Armonizando a Saturno', lessons:lessons2 },
    { title: '3.3 Saturno y el tiempo', lessons:lessons3 }
]
