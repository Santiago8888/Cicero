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

const mapHouses = (house:number) => {
    if(house === 1) return 'Casa I'
    if(house === 2) return 'Casa II'
    if(house === 3) return 'Casa III'
    if(house === 4) return 'Casa IV'
    if(house === 5) return 'Casa V'
    if(house === 6) return 'Casa VI'
    if(house === 7) return 'Casa VII'
    if(house === 8) return 'Casa VIII'
    if(house === 9) return 'Casa IX'
    if(house === 10) return 'Casa X'
    if(house === 11) return 'Casa XI'
    if(house === 12) return 'Casa XII'
    return ''
}

const mapSign = (text:string, { sign }:iUser) => sign ? text.replace('DYNAMIC_SIGN', mapSigns(sign)) : text
export const mapHouse = (text:string, { house }:iUser) => house ? text.replace('DYNAMIC_HOUSE', mapHouses(house)) : text.replace('DYNAMIC_HOUSE', '')

export const mapAstroText = (text:string, user:iUser) => mapHouse(mapSign(text, user), user)
