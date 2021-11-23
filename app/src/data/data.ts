import { iRecordings } from '../components/Forum/Recordings'
import { iForum } from '../components/Forum/Forum'
import { iUnit } from '../components/LayOut/Menu'

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


export const Units:iUnit[] = [
    { title: '1. Saturno y el Karma', modules: module1 },
    { title: '2. El Signo de Saturno', modules: module2 },
    { 
        title: '3. La Casa de Saturno', 
        modules: [
            { title: '3.1 La casa de tu Saturno', lessons:[] },
            { title: '3.2 Los ciclos de Saturno', lessons:[] },
            { title: '3.3 Saturno y la Salud.', lessons:[] }
        ] 
    }, { 
        title: '4. Saturno y la Kabbalah', 
        modules: [
            { title: '4.1 Binah y el inicio de la existencia', lessons:[] },
            { title: '4.2 Saturno desde la Kabbalah', lessons:[] },
            { title: '4.3 El COVID y Saturno en Acuario', lessons:[] }
        ] 
    }
]
