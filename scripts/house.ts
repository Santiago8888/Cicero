import { strict as assert } from 'assert';

const sampleHouses = [
    318.79129396192354,
    355.998186704872,
    30.169769481538882,
    58.92510470863391,
    84.30331881473234,
    109.63961778734267,
    138.79129396192354,
    175.99818670487207,
    210.16976948153888,
    238.9251047086339,
    264.30331881473234,
    289.6396177873427
]

const isHouse = (degrees:number, house:number, index:number, houses:number[]) => {
    // Is bigger than the cusp.

    const isLargerThanCusp = degrees > house
    const maxHouse = Math.max(...houses)
    const isMaxHouse = maxHouse === house

    const nextHouse = index !== 11 ? houses[index+1] : houses[0]
    const isSmallerThanNext = degrees < nextHouse

    if(isLargerThanCusp) {

        if(isSmallerThanNext) return true
        if(!isMaxHouse) return false

        const isLargerThanMax = degrees > maxHouse
        if(isLargerThanMax) return true
    }

    if(isMaxHouse) {
        if(isSmallerThanNext) return true
    }

    return false
}

export const getHouse = (degrees:number, houses:number[]) => houses.findIndex((h, i) => isHouse(degrees, h, i, houses))

assert.equal(getHouse(320, sampleHouses), 0)
assert.equal(getHouse(358, sampleHouses), 1)
assert.equal(getHouse(20, sampleHouses), 1)
assert.equal(getHouse(40, sampleHouses), 2)
assert.equal(getHouse(60, sampleHouses), 3)
assert.equal(getHouse(90, sampleHouses), 4)
assert.equal(getHouse(120, sampleHouses), 5)
assert.equal(getHouse(150, sampleHouses), 6)
assert.equal(getHouse(180, sampleHouses), 7)
assert.equal(getHouse(220, sampleHouses), 8)
assert.equal(getHouse(240, sampleHouses), 9)
assert.equal(getHouse(266, sampleHouses), 10)
assert.equal(getHouse(270, sampleHouses), 10)
assert.equal(getHouse(300, sampleHouses), 11)
