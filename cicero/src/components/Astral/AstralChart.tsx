import { select, Selection, ValueFn } from "d3-selection"
import { arc, Arc, DefaultArcObject } from 'd3-shape'
import { useEffect } from "react"

type SVG =  Selection<SVGSVGElement, unknown, HTMLElement, any>
export type HouseNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |12

export interface iPlanet { 
    name:Planet,
    house: HouseNumber,
    degrees: number, 
    text: string 
}

interface iMappedPlanet {
    house: HouseNumber,
    text: string, 
    degree: number, 
    name: Planet,
    path: string, 
    color: DeepColor    
}

const x_center = 300
const y_center = 300
const radius = 100
const circles = [100, 103, 120, 123, 260, 270, 297, 300]

type Color = '#FFFEDD' | '#FDEDF6' | '#E0FCDF' | '#DFFFF9'
const colors:Color[] = ['#FFFEDD', '#FDEDF6', '#E0FCDF', '#DFFFF9']


const house_colors = ['#E0FCDF', '#DFFFF9', '#FFFEDD', '#FDEDF6']

type DeepColor = '#950193' | '#B16148' | '#1528B2' | '#054D1B'
const deep_colors = ['#950193', '#B16148', '#1528B2', '#054D1B']
const sign_names = [ 'Cap', 'Sag', 'Sco', 'Lib', 'Vir', 'Leo', 'Can', 'Gem', 'Tau', 'Ari', 'Pis', 'Aqu' ]
const sign_imgs = sign_names.map(sign => `/signs/${sign}.png`) 

const planet_names = [ 
    'Sun', 
    'Moon', 
    'Mercury', 
    'Venus', 
    'Mars', 
    'Jupiter', 
    'Saturn', 
    'Uranus', 
    'Neptune', 
    'Pluto', 
    'North Node', 
    'South Node'
] as const
export type Planet =  typeof planet_names[number]

const get_element = (color:DeepColor) => ({ '#950193': 'fire', '#B16148': 'terra', '#1528B2': 'air', '#054D1B': 'water' })[color]

interface iGetArc { grade_one:number, grade_two:number, depth:number}
const get_arc_middle = ({ grade_one, grade_two, depth }:iGetArc) => ({
    x: Math.sin((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth + 300,
    y: 300 - Math.cos((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth
})


const get_new_arc_middle = ({ grade_one, grade_two, depth }:iGetArc) => ({
    x: Math.sin((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth + 300,
    y: 300 - Math.cos((grade_one + (grade_two - grade_one)/2)*Math.PI/180)*depth
})

const get_x = (id:HouseNumber, x:number) => ({
    0: -10, 
    1: -8, 
    2: -6, 
    3: 3, 
    4: -2, 
    5: -6, 
    6: -6, 
    7: -6, 
    8: -4, 
    9: -2, 
    10: -11, 
    11: -13, 
    12: -10
})[id || 12] + x


const get_y = (id:HouseNumber, y:number) => ({
    0: -12, 
    1: -14, 
    2: -12, 
    3: -6, 
    4: 0, 
    5: 0,
    6: -6, 
    7: -6, 
    8: -4, 
    9: 2, 
    10:-6, 
    11:-14, 
    12: -10
})[id || 11] + y



const find_conjunctions = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j}) => (i - j) > 0 && 10 > (i - j))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_semi_sextils = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j }) => (i - j) > 28 && 32 > (i - j))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_sextils = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j }) => (i - j) > 57 && 63 > (i - j))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_cuadratures = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j }) => ((i - j) > 82 && 98 > (i - j)) || ((i - j) > 262 && 278 > (i - j)))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'red'}, {planet: m, degree: j, color:'red'}])
).flat()

const find_trigons = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j }) => ((i - j) > 114 && 126 > (i - j)) || ((i - j) > 234 && 246 > (i - j)))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'green'}, {planet: m, degree: j, color:'green'}])
).flat()

const find_quintiles = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j }) => ((i - j) > 147 && 153 > (i - j)) || ((i - j) > 207 && 213 > (i - j)))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'blue'}, {planet: m, degree: j, color:'blue'}])
).flat()

const find_oppositions = (planets:iMappedPlanet[]) => planets.map(({degree: i, name: n}) => planets
    .filter(({degree: j }) => (i - j) > 170 && 190 > (i - j))
    .map(({ degree: j, name: m }) => [{planet: n, degree: i, color:'#FF0090'}, {planet: m, degree: j, color:'#FF0090'}])
).flat()

interface iAspect { planet:Planet, degree:number, color:string}
const get_all_aspects = (planets:iMappedPlanet[]) => [ ...find_conjunctions(planets), ...find_semi_sextils(planets), 
  ...find_sextils(planets), ...find_cuadratures(planets), ...find_trigons(planets), ...find_quintiles(planets),
  ...find_oppositions(planets).reduce((d, i, idx, l) => idx < l.length - 1 ? [...d, i] : d, [] as iAspect[][])
]

const get_x_coord = ({degree}:{degree:number}) => x_center + Math.cos((degree + 192) *Math.PI/180)*radius 
const get_y_coord = ({degree}:{degree:number}) => y_center + Math.sin((degree + 372) *Math.PI/180)*radius
const get_origin = ({degree, color}:{degree:number, color:string}) => ({ x: get_x_coord({degree}), y: get_y_coord({degree}), color })

type DrawAspect = [{x:number, y:number, color:string}, {x:number, y:number}]
const get_aspect_coords = (aspect:iAspect[]):DrawAspect => aspect.map(({ degree, color }) => get_origin({ degree, color })) as DrawAspect

const map_planets =(planets:iPlanet[]):iMappedPlanet[] => planets.map(({name, house, degrees, text}, idx) => ({ 
    house: house, 
    text: text, 
    degree: house*30 + degrees, 
    name: name, 
    path: `planets/${name}`, 
    color: deep_colors[(house + 3) % 4] as DeepColor
}))

const dynamic_x_coord = ({degree, r }:{degree:number, r:number}) => x_center + Math.cos((degree + 192)* Math.PI/180)*r
const dynamic_y_coord = ({degree, r }:{degree:number, r:number}) => y_center + Math.sin((degree + 372)* Math.PI/180)*r
const get_dynamic_coords = ({degree, color}:{degree:number, color:string}, r:number) => ({ 
    x: dynamic_x_coord({degree, r:r}), y: dynamic_y_coord({degree, r:r}), color 
})

const are_planets_close = (planets:iMappedPlanet[]) => !!planets.find(({ degree }) => 
    planets.find(({ degree: deg }) => degree - deg < 9 && degree - deg > 0)
)


interface iAstralChart { planets:iPlanet[], houses:number[]}
export const AstralChart = ({ planets, houses }: iAstralChart) => {

    useEffect(() => { 
        const draw_circle = (svg:SVG, r:number) => svg
            .append('circle')
            .style('stroke', '#ADD8E6')
            .style('fill', 'rgb(256,256,256)')
            .attr('r', r)
            .attr('cx', 300)
            .attr('cy', 300)

        const new_arc = (startAngle:number, endAngle:number, innerRadius:number, outerRadius:number):Arc<any, DefaultArcObject> => arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(startAngle * (Math.PI/180))
            .endAngle((endAngle || startAngle)* (Math.PI/180))

        interface iArcProps {startAngle:number, endAngle:number, innerRadius:number, outerRadius:number, fill:string}
        const draw_arc = (svg:SVG, {startAngle, endAngle, innerRadius, outerRadius, fill}:iArcProps ) => svg
            .append('path')
            .attr('d', new_arc(startAngle, endAngle, innerRadius, outerRadius) as ValueFn<SVGPathElement, unknown, string | number | boolean | null>)
            .attr('transform', 'translate(300,300)')
            .style('stroke', '#ADD8E6')
            .style('fill', fill || 'rgba(0,0,0,0)')

        const create_text = (svg:SVG, {x, y}:{x:number, y:number}, text:number, color:string) => svg
            .append('text')
            .text(text)
            .attr(
                'transform', 
                `translate(
                    ${ x > 300 ? text !== 6 && text !== 7 ? x - 1 : text === 7 ? x - 5 : x - 4 : text !== 1 ? x - 8 : x - 3}, 
                    ${ y > 300 ? text !== 3 && text !== 4 ? y : y + 3 : text !== 9 && text !== 10 && text !== 11 ? y + 10 : y + 7 }
                )`
            )
            .style('fill', color)

        const draw_image = (svg:SVG, { x, y }:{x:number, y:number}, path:string, idx:HouseNumber) => svg
            .append('image')
            .attr('xlink:href', path)
            .attr('width', 20)
            .attr('height', 20)
            .attr('x', get_x(idx, x))
            .attr('y', get_y(idx, y))

        const draw_line = (svg:SVG, {x1, y1, x2, y2}:{x1:number, y1:number, x2:number, y2:number}, color:string) =>  svg
            .append("line")
            .style("stroke", color) 
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)

        
        const draw_aspect = (svg:SVG, [{x:x1, y:y1, color}, {x:x2, y:y2}]:DrawAspect) => draw_line(svg, {x1: x1, x2: x2, y1: y1, y2: y2}, color)


        interface iRotatedText { text:string, color:string, rotation:number, pixels:string}
        const rotated_text = (svg:SVG, {x, y}:{x:number, y:number}, {text, color, rotation, pixels}:iRotatedText) => svg
            .append('text')
            .text(text)
            .attr('transform', `translate(${ x }, ${ y }) rotate(${rotation})`)
            .style('fill', color)
            .style("font-size", pixels)

        const draw_planet =(svg:SVG, planet:iMappedPlanet) => { 
            const { x, y } = get_dynamic_coords({degree: planet.degree, color:''}, 150)
            draw_image(svg, {x: x, y: y}, `${planet.path}_${get_element(planet.color)}.png`, 12)

            rotated_text(
                svg, 
                {x: x+13+(x-450)/150*(planet.text.split(' ')[0].length < 3 ? 16 : 26), y: y+7+(y-300)/150*26}, 
                {text:planet.text.split(' ')[0], color: planet.color, rotation:355, pixels:'20px'}
            )

            draw_image(svg, get_dynamic_coords({degree: planet.degree, color:''}, 200), [...sign_imgs].reverse()[(planet.house + 1) % 12], 12)
            rotated_text(
                svg, 
                {x:  x+ 62+(x-450)/2, y: y+3+(y > 300 ? (y-300)/1.8 : (y-300)/2.25)}, 
                {text:planet.text.split(' ')[1], color: planet.color, rotation:355, pixels:'20px'}
            )
        }


        const ward_off_planets = (svg:SVG, planets:iMappedPlanet[]):void[] => are_planets_close(planets)
            ?   ward_off_planets(
                        svg, 
                        planets.map(planet => 
                            planets.find(({ degree }) => Math.abs(planet.degree - degree) < 9 && 0 < Math.abs(planet.degree -degree))
                            ?   planets.find(({ degree }) => planet.degree - degree < 9 && 0 < planet.degree -degree)
                                ?   {...planet, degree: planet.degree + 1} 
                                :   {...planet, degree: planet.degree - 1}
                            :   planet
                        )
                    )
            :  planets.map(planet => draw_planet(svg, planet))

    
        const draw_chart = (planets:iMappedPlanet[], houses:number[]) => {
            const lastSVG = select('#viz')
            lastSVG.selectAll("*").remove()

            const svg = select('#viz').append('svg').attr('id', '#AstralChart').attr('width', 600).attr('height', 600)
            circles.map(r => draw_circle(svg, r))

            const signs:number[] = [...new Array(12)].map((_, i) => (i * 30) + 270 + houses[0] % 30)
            signs.map((d, i) => draw_arc(svg, {startAngle: d, endAngle: signs[i+1], innerRadius: 260, outerRadius: 300, fill:'' }))
            signs.map((d, i) => draw_arc(svg, {
                startAngle: d, 
                endAngle: signs[i+1] ? signs[i+1] : signs[0] + 360, 
                innerRadius: 270, 
                outerRadius: 297, 
                fill: colors[i%4]
            }))

            const flint = 0
            const chartHouses = [
                ...houses.reverse().map(h => Math.round(h + flint  - houses[0] + 710.4) % 360), 
                Math.round(flint - 9.6) % 360
            ]

            console.log(houses)
            console.log(chartHouses)

            chartHouses.filter((_, i) => i < 12).map((d, i) => {
                draw_arc(
                    svg, 
                    {startAngle: d, endAngle: chartHouses[i+1], innerRadius: 103, outerRadius: 120, fill: house_colors[(14-i) % 4]}
                )

                create_text(
                    svg,
                    get_arc_middle({grade_one: d, grade_two: chartHouses[i + 1], depth: 113}),
                    ((i+9) % 12) + 1,
                    deep_colors[(i+1)%4]
                )

                return draw_arc(svg, {startAngle: d, endAngle: chartHouses[i+1], innerRadius: 100, outerRadius: 260, fill:''})
            })

            signs.map((_, i) => draw_image(
                svg, 
                get_new_arc_middle({ 
                    grade_one: signs[0] + i*30, 
                    grade_two: signs[1] + i*30, 
                    depth: 280
                })
                , sign_imgs[i], i as HouseNumber
            ))

            const aspects = get_all_aspects(planets)
            aspects.map(aspect => draw_aspect(svg, get_aspect_coords(aspect)))
            ward_off_planets(svg, planets)
        }


        const mappedPlanets = map_planets(planets)
        draw_chart(mappedPlanets, [...houses])
    }, [planets, houses])


    return <div className="App" style={{margin:'50px 25px'}}>
        <div id='viz'/>
    </div>
}
