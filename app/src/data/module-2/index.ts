import { iLesson } from "../../components/LayOut/Menu"


const lessons1:iLesson[] = [
    { 
        type:'Video', 
        title:'El significado del signo', 
        link:'https://youtu.be/uJP6kRJq9Qs', 
    }, {
        type:'Video',
        title:'Tus vidas pasadas',
        link:'https://youtu.be/qR1KmIG5Fl0'
    }
]


const lessons2:iLesson[] = [
    {
        type:'Video',
        title:'La influencia de tu signo',
        link:'https://youtu.be/k5oxhnHwYWQ'
    }, {
        type:'Video',
        title:'La misión de Saturno',
        link:'iLpqbBzRIvk'
    }
]

export const module2 = [
    { title: '2.1 Saturno y tus vidas pasadas', lessons:lessons1 },
    { title: '2.2 La misión de Saturno', lessons:lessons2 },
    { title: '2.3 El camino de retorno', lessons:[] }
]
