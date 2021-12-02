const reader = require('../reader')

reader.getInput('inputs/_input1.txt').then((input) => {
    input = input.map((line) => parseInt(line))
    const solve = (interval) => input.reduce((acc, curr, i) => acc + (curr > (input[i - interval] || Number.MAX_SAFE_INTEGER) ? 1 : 0), 0)
    console.log(`Part 1: ${solve(1)}`)
    console.log(`Part 2: ${solve(3)}`)
})