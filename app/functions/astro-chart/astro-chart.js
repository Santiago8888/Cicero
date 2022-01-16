const swisseph = require('swisseph')
const axios = require('axios')
require('dotenv').config()

const { location_key } = process.env
const { timezone_key } = process.env

swisseph.swe_set_ephe_path (__dirname + './../../ephe')
const flag = swisseph.SEFLG_SPEED

const { 
    SE_SUN: SUN, 
    SE_MOON: MOON, 
    SE_MERCURY: MERCURY, 
    SE_VENUS: VENUS, 
    SE_MARS: MARS, 
    SE_JUPITER: JUPITER,
    SE_SATURN: SATURN, 
    SE_URANUS: URANUS, 
    SE_NEPTUNE: NEPTUNE, 
    SE_PLUTO: PLUTO, 
    SE_TRUE_NODE: NODE 
} = swisseph

const planets_objs = [ SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO, NODE ]
const planet_names = [ 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'North Node' ]


const locationRoot = 'http://api.positionstack.com/v1/forward'
const getCoordinates = async(query) => {
    const url = `${locationRoot}?access_key=${location_key}&query=${query}`
    const { data } = await axios.get(url)
    return { lat:data.data[0].latitude, lng:data.data[0].longitude }
}

const timeRoot = `http://api.timezonedb.com/v2.1/get-time-zone`
const timeParams = `format=json&by=position&`
const getTimeZone = async({ lat, lng, time }) => {
    console.log(lat, lng)
    const url = `${timeRoot}?key=${timezone_key}&${timeParams}lat=${lat}&lng=${lng}&time=${time}`
    const { data } = await axios.get(url)
    return data.gmtOffset
}

exports.handler = async ({ queryStringParameters }, context) => {
    const { query } = queryStringParameters
	const year = Number(queryStringParameters.year)
	const month = Number(queryStringParameters.month)
	const day = Number(queryStringParameters.day)
	const hour = Number(queryStringParameters.hour)
	const minute = Number(queryStringParameters.minute)
  
    const { lat, lng } = await getCoordinates(query)
    const unixTime = Math.round(new Date(year, month - 1, day, hour, minute)/1000)

    const offset = await getTimeZone({ lat, lng, time:unixTime })

    const minutes = minute/60
    const time = (hour + minutes - offset/3600) 
    const jul_day = swisseph.swe_julday(year, month, day, time, swisseph.SE_GREG_CAL)

    const get_position = ({planet, day}) => swisseph.swe_calc_ut(day, planet, flag)

    const planets_position = planets_objs.map(p => get_position({planet: p, day: jul_day}).longitude)
    const planets = planets_position.map((p, i) => {
        const degrees = p % 30
        const minutes = 0|(0|(degrees%1)*60e7)/1e7 // https://stackoverflow.com/a/5786281/6823310
        const text = `${Math.floor(degrees)}° ${String(minutes).length === 2 ? minutes : `0${minutes}`}'`
        return {
            name: planet_names[i],
            house: Math.ceil(p/30),
            degrees,
            text
        }
    })
    

    const { house: houses } = swisseph.swe_houses(jul_day, lat, lng, 'P')
	
	return {
        statusCode: 200,
        body: JSON.stringify({ 
            planets,
            houses 
        }),
    }
}
