const reader = require('../reader')

reader.getInput('inputs/_input6.txt').then((input) => {
    const timers1 = Array(9).fill(0)
    input[0].split(',').map((timer) => parseInt(timer)).forEach((timer) => {
        timers1[timer]++
    })
    const timers2 = timers1.slice()
    const simulate = (timers, simulationsLeft) => {
        if (simulationsLeft > 0) {
            const births = timers.shift()
            timers.push(births)
            timers[6] += births
            simulate(timers, simulationsLeft - 1)
        }
    }

    simulate(timers1, 80)
    console.log(`Part 1: ${timers1.reduce((acc, curr) => acc + curr)}`)

    simulate(timers2, 256)
    console.log(`Part 2: ${timers2.reduce((acc, curr) => acc + curr)}`)
})