import { iQuestion } from "../../components/Views/Quiz"

export const quiz1:iQuestion[] = [
    { 
        question: '1. ¿Cuál es la casa en la que te sientes más satisfech@ actualmente?', 
        answers:[
            { answer:'Casa 7: pareja.', value:true },
            { answer:'Casa 10: profesión.', value:true },
            { answer:'Casa 12: espiritualidad.', value:true },
            { answer:'Casa 6: salud.', value:true },
        ]
    }, {
        question:'2. ¿¿Cuál es la casa a la que sientes que le necesitas dedicar más tiempo o atención??',
        answers:[
            { answer:'Casa 4: la familia.', value:true },
            { answer:'Casa 1: tu yo personal.', value:true },
            { answer:'Casa 5: el gozo.', value:true },
            { answer:'Casa 11: ayuda desinteresada, servicio.', value:true },
        ]
    }
]
