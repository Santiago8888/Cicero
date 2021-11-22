import { iQuestion } from "../../components/Views/Quiz"

export const quiz1:iQuestion[] = [
    { 
        question: '1. ¿Cuál es la primer consecuencia de tener a Saturno en un signo?', 
        answers:[
            { answer:'En ese signo Saturno se va a enfocar y nos va a auditar.', value:true },
            { answer:'Nos llevaremos muy bien con las personas de ese signo.', value:false },
            { answer:'Tendremos todas las virtudes de ese signo.', value:false },
            { answer:'Sabremos que fue el signo de nuestro vida pasada más reciente.', value:false },
        ]
    }, {
        question:'2. ¿Cuál es nuestro compromiso con el signo de Saturno?',
        answers:[
            { answer:'Ser totalmente responsables en las características de ese signo.', value:true }, 
            { answer:'Demostrar que ese signo es el mejor de todos.', value:false }, 
            { answer:'Disminuir la inercia de vidas pasadas de ese signo.', value:false }, 
            { answer:'Guiar responsablemente a las personas que tengan ese signo.', value:false }, 
        ]
    }
]
