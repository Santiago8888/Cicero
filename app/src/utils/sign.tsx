import { iUser, Sign } from '../App'


// On change: review public doc names as well (PDFs).
export const mapSigns = (sign:Sign)  => ({
    Ari: 'Aries',
    Tau: 'Tauro',
    Gem: 'Géminis',
    Can: 'Cáncer',
    Leo: 'Leo',
    Vir: 'Virgo',
    Lib: 'Libra',
    Sco: 'Escorpio',
    Sag: 'Sagitario',
    Cap: 'Capricornio',
    Aqu: 'Acuario',
    Pis: 'Piscis'
}[sign])

export const mapSign = (text:string, { sign }:iUser) => sign ? text.replace('DYNAMIC_SIGN', mapSigns(sign)) : text
