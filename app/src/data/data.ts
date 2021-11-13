import { iRecordings } from '../components/Forum/Recordings'
import { iLesson, iUnit } from '../components/LayOut/Menu'
import { iQuestion } from '../components/Views/Quiz'
import { iForum } from '../components/Forum/Forum'
import { iPost } from '../components/Forum/Posts'
import { planets, houses } from './chart'
import { iUser } from '../App'


export const defaultUser:iUser = { 
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

const quiz11:iQuestion[] = [
    { 
        question:'1. ¿Qué indica Saturno en la carta astral?', 
        answers:[
            { answer:'Como encontrar abundancia', value: false },
            { answer:'Si tienes tiempo o se te acabo el tiempo', value: true },
            { answer:'Nuestra espiritualidad y conexión con la fuente dívina', value: false },
            { answer:'Lo que amamos y nos hace felices', value: false }
        ] 
    }, { 
        question:'2. ¿Cuando nos indica Saturno que es tiempo de cambios?', 
        answers:[
            { answer:'Cada que llega al signo de Acuario', value: false },
            { answer:'Durante la infancia y adolescencia', value: false },
            { answer:'Aproximadamente cada siete años', value: true },
            { answer:'A los 42 cuando se junta con Urano', value: false }
        ] 
    }, { 
        question:'3. ¿Cuál es uno de los principales mensajes de Saturno?', 
        answers:[
            { answer:'Disfruta la vida, se feliz', value: false },
            { answer:'Ama incondicionalmente', value: false },
            { answer:'Perdona al projimo', value: false },
            { answer:'Hazte responsable, madura', value: true }
        ] 
    }, { 
        question:'4. ¿Qué nos enseña Saturno?', 
        answers:[
            { answer:'Nuestros defectos y áreas de oportunidad', value: false },
            { answer:'La consecuencia de nuestras acciones', value: true },
            { answer:'El futuro y el pasado', value: false },
            { answer:'Como tomar el contral el control nuestra vida', value: false }
        ] 
    }, { 
        question:'5. ¿Cuál es la responsabilidad de Saturno?', 
        answers:[
            { answer:'Ponernos limites', value: true },
            { answer:'Elevar la consciencia cósmica', value: false },
            { answer:'Distinguir entre la verdad y la mentira', value: false },
            { answer:'Sostener la creación', value: false }
        ] 
    }, { 
        question:'6. ¿Todos tenemos el mismo Saturno?', 
        answers:[            
            { answer:'Solo al principio después cambia conforme a nuestra acciones.', value: false },
            { answer:'Si, Saturno forma parte de una conciencia universal.', value: false },
            { answer:'No, para cada uno fluye de forma diferente.', value: true },
            { answer:'Va cambiando, pero lo que esta bien y mal es igual para todos.', value: false }
        ] 
    }, { 
        question:'7. ¿Cuál es el objetivo final de tu Saturno?', 
        answers:[
            { answer:'Enseñarnos a dar un buen ejemplo en un área específica de la vida.', value: true },
            { answer:'Limitarnos para que no nos salgamos de control.', value: false },
            { answer:'Premiar a quienes se conectan con su ser divino interior.', value: false },
            { answer:'Llevar la contabilidad de tus acciones y karma.', value: false }
        ] 
    }
]


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
    description:'Comparte las dudas y preguntas que quieras que sean respondidas en la sesión semanal.', 
    questions:[{ 
        question: '¿Qué significa cuando el Sol está en Leo?', 
        details: 'Mi carta tiene el Sol en Leo y no se que significa.',
        likes: []
    }, { 
        question: 'Cómo afecta la Luna en Cancer mis emociones?', 
        details: 'Mi carta tiene la Luna en Cancer cual es el efecto en mis emociones.',
        likes: []
    }] 
}


export const Recordings:iRecordings = { 
    title:'Grabaciones Semanales', 
    description:'Todos los Jueves nos reunimos por Zoom para resolver tus dudas, estás son las grabaciones de la anteriores.', 
    recordings:[{ 
        title: 'Marzo 28: El Sol y los Signos', 
        link:'https://www.youtube.com/watch?v=BPwn_iCi7BQ', 
        description: 'Aclaramos lo que signfica tu signo solar, la casa y como trabajar las energias.' 
    },  { 
        title: 'Abril 3: La Luna y el Karma', 
        link:'https://www.youtube.com/watch?v=BPwn_iCi7BQ', 
        description: 'Como puedes utilizar el poder de manifestación de las emociones para materializar un presente abundante.' 
    }] 
}


const lessons:iLesson[] = [
    {...lesson, type:'Video', title:'Video'}, 
    {...lesson, type:'Reading', title:'Lectura', link:'sample.pdf'}, 
    lesson
]

export const Posts:iPost[] = [{
    name:'Alice',
    title:'Title', 
    image:'Pis',
    detail:'Detail', 
    comments:[
        {name:'Beth', image:'Aqu', comment:'Test'} 
    ],
    likes: []
}]


const posts11 = [
    'Saturno es un gran guía. Comparte la historia de un guía que te haya inspirado a ser mejor persona.',
    '¿Sabes en qué eres experta? Cuentanos en qué y cómo te volviste experta en eso.',
    'Relata una experiencia en la que hayas aprendido a través de la limitación.',
    'Para tí, ¿Qué es la humildad y cómo la practicas diariamente?',
    'Saturno nos pide que cada vez seamos mejores ¿En que te estás esforzando hoy para crecer como persona?',
    'Comparte una ocasión en la que hayas sido un buen ejemplo para alguien y que sensación te dejo.'
]

const module11:iLesson[] = [
    { type:'Video', title:'¿Qué es Saturno?', link:'https://youtu.be/-AEpq9zauQ8'  },
    { type:'Quiz', title:'Quiz 1.1', questions:quiz11 },
    { type:'Video', title:'La importancia de Saturno', link:'https://youtu.be/gQarN9nNKdA' },
    { type:'Reflection', title:'Preguntas de Reflexión', description:['Te invitamos a que realices una pausa y reflexiones sobre alguna de estás preguntas. Si gustas puedes visitar el Chat y compartir tu experiencia en base a alguno de estos temas.'], posts:posts11 },
]


const quiz12:iQuestion[] = [
    { 
        question:'1. ¿Qué significa la palabra karma?', 
        answers:[
            { answer:'Deuda', value:false },
            { answer:'Acción', value:true },
            { answer:'Pago', value:false },
            { answer:'Salida', value:false }
        ]
    }, { 
        question:'2. ¿Porqué existe el karma?', 
        answers:[
            { answer:'Para que nos portemos bien.', value:false },
            { answer:'Enseñar que nuestros actos tienen consecuencias.', value:true },
            { answer:'Vivimos en un sistema, no hay acciones aisladas.', value:true },
            { answer:'Es una ley universal, no hay que preguntar el porqué sino aceptarla.', value:false }
        ]
    }, { 
        question:'3. ¿Cuando empezamos a ver la manifestación del karma?', 
        answers:[
            { answer:'Depende de la posición de Saturno y nuestra carta astral.', value:false },
            { answer:'Cuando perjudicarnos a alguien conscientemente.', value:false },
            { answer:'Cuando vamos en contra de nuestros valores.', value:false },
            { answer:'Cuando la acción se ha repetido muchas veces.', value:true }
        ]
    }, { 
        question:'4. ¿En dónde quedan registrados todos los efectos de nuestras acciones?', 
        answers:[
            { answer:'En nuestra consciencia', value:false },
            { answer:'En la memoria cósmica', value:false },
            { answer:'En el mundo astral', value:true },
            { answer:'No todas nuestros efectos quedan registrados.', value:false }
        ]
    }, { 
        question:'5. ¿Cómo se llama el periodo entre la causa y el efecto?', 
        answers:[
            { answer:'Periodo de Manifestación', value:false },
            { answer:'Misericordia', value:true },
            { answer:'Expectativa', value:false },
            { answer:'Gestación', value:false }
        ]
    }, { 
        question:'6. ¿Porqué no vemos inmediatamente las consecuencias de nuestros actos?', 
        answers:[
            { answer:'Para poder practicar y aprender', value:true },
            { answer:'Para liberar nuestro poder creador y de manifestación.', value:false },
            { answer:'Para permitirnos enmendar nuestros errores.', value:false },
            { answer:'Es una consecuencia de vivir en un mundo físico.', value:false }
        ]
    }, { 
        question:'7. ¿Qué acciones se manifiestan más rápido?', 
        answers:[
            { answer:'Las positivas', value:true },
            { answer:'Las negativas', value:false },
            { answer:'Las intencionales', value:false },
            { answer:'Las que hacemos en público', value:false }
        ]
    }, { 
        question:'8. ¿Qué se requiere para tener un karma positivo?', 
        answers:[
            { answer:'Hacer meditación y oración.', value:false },
            { answer:'Saludar a los demás amablemente.', value:false },
            { answer:'Enmendar el daño de nuestras acciones.', value:false },
            { answer:'Hacer acciones positivas y sostener esa frecuencia de amor, alegría o compartir.', value:true }
        ]
    }, { 
        question:'9. ¿Porqué hay personas que no enfrentan consecuencias por acciones negativas?', 
        answers:[
            { answer:'Tienen suerte', value:false },
            { answer:'Para enseñar a los demás', value:false },
            { answer:'Se está acumulando su karma', value:true },
            { answer:'No existen las acciones negativas', value:false }
        ]
    }, { 
        question:'10. ¿Cuando empezamos a tener el karma negativo en nuestra vida?', 
        answers:[
            { answer:'Cuando nos pasamos 50 altos', value:false },
            { answer:'Cuando se nos acaba el karma positivo', value:false },
            { answer:'Cuando necesitamos parar, y hacer las cosas de acuerdo a las reglas.', value:true },
            { answer:'Cuando Saturno se encuentra en el 6 o 13 de cada signo.', value:false }
        ]
    }, { 
        question:'11. ¿Cuál es la relación entre el karma y Saturno?', 
        answers:[
            { answer:'No tienen relación actualmente, pero fueron creados al mismo tiempo.', value:false },
            { answer:'Saturno manifiesta la ley del karma.', value:true },
            { answer:'Saturno puede llenarnos de gracia y evitar las consecuencias negativas.', value:false },
            { answer:'Saturno es el Dios del Karma.', value:false }
        ]
    }, { 
        question:'12. ¿Cuál es otra causa de que enfrentamos consecuencias negativas?', 
        answers:[
            { answer:'No buscar la espiritualidad.', value:false },
            { answer:'Las responsabilidades que hemos adquirido no las estamos llevando a cabo.', value:true },
            { answer:'Los pensamientos de las acciones que no llevamos a cabo.', value:false },
            { answer:'Empeñarnos en seguir exclusivamente nuestra voluntad.', value:false }
        ]
    },
]

const posts12:string[] = [
    '¿Quieres compartir alguna vez en que Saturno te haya dado avisos?',
    '¿Alguna vez te has sentido limitado o bloqueado? Cuéntanos cómo empezó esa sensación y si recibiste comentarios de personas a tu alrededor.',
    '¿Has recibido mensajes o señales recientemente? Cuéntanos cómo y cuáles:',
    '¿Tienes alguna experiencia curiosa o divertida de la manifestación de la ley de la causa y efecto?',
    '¿Te has aferrado a algo que no te deja crecer, qué pasó?',
    '¿Cómo te comunicas con tu alma?',
    '¿En qué área crees que puedes crecer actualmente?',
    '¿Para tí, qué es el entendimiento?',
    '¿De qué eres responsable, el día de hoy?'
]


const module12:iLesson[] = [
    { type:'Video', title:'El Karma', link:'https://youtu.be/dNt2saEg8As' },
    { type:'Quiz', title:'Quiz 1.2', questions:quiz12 },
    { type:'Reading', title:'Saturno en la Astrología', },
    { type:'Video', title:'Saturno, el maestro', link:'https://youtu.be/uilBR7op_GY' },
    { 
        type:'Reflection', 
        title:'Ejercicio de Compartir', 
        posts:posts12, 
        description:[
            `Te invitamos a que hagas una segunda pausa y reflexiones cómo se manifiesta el karma en tu vida.
            Nuevamente ponemos a tu disposición sugerencias para compartir en el foro, por favor, se muy consciente de lo que publicas.`
        ] 
    },
]


const quiz13:iQuestion[] = [
    { 
        question: '1. ¿Cómo lidiar con las lecciones de Saturno?', 
        answers:[
            { answer:'Identificar, soltar y entender.', value:true },
            { answer:'Escuchar, rezar y tomar acción.', value:false },
            { answer:'Resignarse, aceptar y agradecer.', value:false },
            { answer:'Observar, buscar y enseñar.', value:false },
        ]
    },   { 
        question: '2. ¿Cómo identificamos si estamos pasando por una lección de Saturno?', 
        answers:[
            { answer:'Las cosas dejan dejan de fluir, y obtenemos señales de las personas en nuestra vida diaria.', value:true },
            { answer:'Nos sentimos deprimidos, cansados y sin motivación.', value:false },
            { answer:'Nos corren del trabajo o tenemos problemas profesionales.', value:false },
            { answer:'Nuestra salud se resiente y constantemente discutimos con las personas a nuestro alrededor.', value:false },
        ]
    },   { 
        question: '3. ¿Cuales son las causas de que nos alejemos de nuestro centro?', 
        answers:[
            { answer:'Estar muy dispersos o sin falta de ritmo.', value:true },
            { answer:'No escuchamos a los demás y hablamos mucho.', value:false },
            { answer:'Olvidamos el cuidado de nuestro y alma.', value:false },
            { answer:'Actuamos en contra de nuestros valores.', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    },   { 
        question: '', 
        answers:[
            { answer:'', value:true },
            { answer:'', value:false },
            { answer:'', value:false },
            { answer:'', value:false },
        ]
    }, 
]

const module13:iLesson[] = [
    { type:'Video', title:'Las lecciones de Saturno', link:'https://youtu.be/H3xrXhqG5MY' },
    { type:'Quiz', title:'Quiz 1.3' },
    { type:'Video', title:'Escucha las señales', link:'https://youtu.be/_BqqI3A1SZY' },
    { type:'Quiz', title:'Ejercicio Final 1' }
]


export const Units:iUnit[] = [{ 
    title: '1. Saturno y el Karma', 
    modules: [
        { title: '1.1 La importancia de Saturno', lessons:module11 },
        { title: '1.2 El Karma y Saturno', lessons:module12 },
        { title: '1.3 Las lecciones de Saturno', lessons:module13 }
    ]
}, { 
    title: '2. El Signo de Saturno', 
    modules: [
        { title: '2.1 El significado del signo de tu Saturno', lessons },
        { title: '2.2 La misión de tu Saturno', lessons },
        { title: '2.3 Tus vidas pasadas', lessons }
    ] 
}, { 
    title: '3. La Casa de Saturno', 
    modules: [
        { title: '3.1 La casa de tu Saturno', lessons },
        { title: '3.2 El ciclo de 7 años de Saturno', lessons },
        { title: '3.3 Saturno y la Salud.', lessons }
    ] 
}, { 
    title: '4. Saturno y la Kabbalah', 
    modules: [
        { 
            title: '4.1 Binah y el inicio de la existencia', 
            lessons:[
                { title:'Saturno', type:'Chart', description:['El planeta que rige tu responsabilidad'], planet:'Saturn'},
                ...lessons
            ] 
        },
        { title: '4.2 Saturno desde la Kabbalah', lessons },
        { title: '4.3 El COVID y Saturno en Acuario', lessons }
    ] 
}]
