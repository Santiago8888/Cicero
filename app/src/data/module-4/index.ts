import { posts1, posts2, posts3, posts4 } from './posts'
import { iLesson } from '../../components/LayOut/Menu'
import { quiz1 } from './quiz1'
import { quiz2 } from './quiz2'


const lessons1:iLesson[] = [
    { type:'Video', title:'Introducción a la Kabbalah', link:'https://youtu.be/9bjn7W2F-KM' },
    { type:'Quiz', title:'Quiz 4.1', questions:quiz1 },
    { type:'Video', title:'La Apreciación', link:'https://youtu.be/esiDMjWW2Fk' },
    { type:'Reflection', title:'Ejercicio de Reflexión', posts:posts1, numbered:true }
]


const description2 = [
    'Esta lectura te enseña el proceso para materializar una idea, pensamiento o deseo utiliza las herramientas de la Kabbalah.', 
    'Es una técnica que puedes utilizar a cada momento de tu vida, y entre más la practiques más fácil te será utilizarla.',
    'Tiempo mínimo de lectura sugerido: 6 minutos.',
]

const lessons2:iLesson[] = [
    { type:'Video', title:'El Camino de la Manifestación', link:'https://youtu.be/votYUa9V12c' },
    { type:'Quiz', title:'Examen Final', questions:quiz2 },
    { type:'Reading', title:'La Llave de la Creación', link:'docs/La-Llave-de-la-Creación.pdf', min:6, description:description2 },
    { type:'Video', title:'Mi Misión Espiritual', link:'https://youtu.be/uE7kmnAwLhw' },
    { type:'Reflection', title:'Ejercicio de Compartir', posts:posts2, numbered:true }
]


const description3 = [
    'Respetar el Shabbath es una de las prácticas más poderosas de la Kabbalah',
    'Durante el Shabbath se estudia, descansa y disfruta con el propósito de elevar nuestra conciencia espiritual. Conoce más sobre la práctica del Shabbath en esta lectura.',
    'Tiempo mínimo sugerido: 3 minutos.'
]

const postsDescription = [
    `En esta última reflexión sólo hay una pregunta, pero te invitamos a que le respondas detallada y con mucha consciencia considerando los 3 pilares de la era de Acuario: tecnología, ecología y humanismo:`,
]

const nextDescription = [
    'El curso está por terminar pero sabemos que algunos de ustedes querrán continuar su camino de aprendizaje y despertar.',
    'Para dar continuidad puedes unirte a la comunidad y recibir cada semana 2 episodios de podcast: uno el lunes explicando los tránsitos astrológicos de la semana y el segundo los Viernes revelando las enseñanzas de la porción semanal de la Torah.',
    'Puedes solicitar más información sobre la comunidad en WhatsApp. Esperamos que además continúes visitando el curso, haciendo preguntas, asistiendo a los lives y guiando a los nuevos alumnos.'
]

const finalDescription = [
    'El último ejercicio es sobre compartir y enseñar. Recuerda que somos el promedio de las 5 personas con las que más pasamos el tiempo, así que una de las formas más sencillas de crecer es junto a las personas que amamos.',
]

const lessons3:iLesson[] = [
    { type:'Reading', title:'Shabbath', link:'docs/Shabbath.pdf', min:3, description:description3 },
    { type:'Video', title:'Saturno y el COVID', link:'https://youtu.be/QnQr0FDW5gI' },
    { type:'Reflection', title:'Reflexión de la Era de Acuario', posts:posts3, description:postsDescription, numbered:true },
    { type:'Video', title:'Meditación', link:'https://youtu.be/BljfRq4j2uY' },
    { type:'Reading', title:'Siguientes Pasos', description:nextDescription, min:0 },
    { type:'Reflection', title:'Ejercicio Final', end:true, disabled:true, description:finalDescription, posts:posts4, numbered:true },
]


export const module4 = [
    { title: '4.1 Saturno en la Kabbalah', lessons:lessons1 },
    { title: '4.2 Binah y el Inicio de la Existencia', lessons:lessons2 },
    { title: '4.3 Saturno en Acuario', lessons:lessons3 }
]
