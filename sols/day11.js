const reader = require('../reader')

reader.getInput('inputs/input11.txt').then((input) => {
    input = input.map((row) => row.split('').map((energy) => ({ energy: parseInt(energy), flashed: false })))
    const adjacencies = [-1, 0, 1].map((x) => [-1, 0, 1].map((y) => [x, y])).flat()
    adjacencies.splice(4, 1)
    input.forEach((row, y) =>
        row.forEach((octopus, x) => {
            octopus.adjacencies = adjacencies
                .map((offset) => input?.[y + offset[1]]?.[x + offset[0]])
                .filter((octopus) => octopus)
        })
    )
    const octopi = input.flat()
    let numFlashes = 0
    const flash = (octopi) => {
        const nextOctopi = new Set()
        octopi.forEach((octopus) => {
            if (nextOctopi.has(octopus)) nextOctopi.delete(octopus)
            octopus.flashed = true
            octopus.energy = 0
            numFlashes++
            octopus.adjacencies.forEach((adjOctopus) => {
                if (!adjOctopus.flashed && ++adjOctopus.energy > 9) {
                    nextOctopi.add(adjOctopus)
                }
            })
        })
        if (nextOctopi.size > 0) flash(nextOctopi)
    }
    const step = (stepCounter) => {
        stepCounter++
        flash(new Set(octopi.filter((octopus) => ++octopus.energy > 9)))
        if (octopi.every((octopus) => octopus.flashed)) {
            console.log(`Part 2: ${stepCounter}`)
            return
        }
        octopi.forEach((octopus) => {
            octopus.flashed = false
        })
        if (stepCounter === 100) {
            console.log(`Part 1: ${numFlashes}`)
        }
        step(stepCounter)
    }
    step(0)
})
