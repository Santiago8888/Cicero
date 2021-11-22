import { iRecordings } from '../components/Forum/Recordings'
import { iLesson, iUnit } from '../components/LayOut/Menu'
import { iForum } from '../components/Forum/Forum'

import { planets, houses } from './chart'
import { module1 } from './module-1'
import { module2 } from './module-2'
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
    description:'', 
    questions:[] 
}


export const Recordings:iRecordings = { 
    title:'Grabaciones Semanales', 
    description:'', 
    recordings:[]
}


const lessons:iLesson[] = [
    {...lesson, type:'Video', title:'Video'}, 
    {...lesson, type:'Reading', title:'Lectura', link:'sample.pdf'}, 
    lesson
]


export const Units:iUnit[] = [
    { title: '1. Saturno y el Karma', modules: module1 }, 
    { title: '2. El Signo de Saturno', modules: module2 }, 
    { 
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
    }
]
