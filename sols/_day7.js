const reader = require('../reader')

reader.getInput('inputs/_input7.txt').then((input) => {
    const positions = input[0].split(',').map((pos) => parseInt(pos))
    positions.sort((a, b) => a - b)
    const median = positions[positions.length / 2]
    const fuel1 = positions.reduce((acc, curr) => acc + Math.abs(curr - median), 0)
    console.log(`Part 1: ${fuel1}`)

    const mean = Math.floor(positions.reduce((acc, curr) => acc + curr) / positions.length)
    const triangle = (n) => n * (n + 1) / 2
    const fuel2 = positions.reduce((acc, curr) => acc + triangle(Math.abs(curr - mean)), 0)
    console.log(`Part 2: ${fuel2}`)
})