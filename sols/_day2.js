const reader = require('../reader')

reader.getInput('inputs/_input2.txt').then((input) => {
    const part1 = input.reduce(
        (acc, curr) => {
            const direction = curr.slice(0, -2)
            let amount = parseInt(curr.slice(-1))
            switch (direction) {
                case 'forward':
                    acc.position += amount
                    break
                case 'up':
                    amount *= -1
                case 'down':
                    acc.depth += amount
            }
            return acc
        },
        {
            position: 0,
            depth: 0,
        }
    )
    console.log(`Part 1: ${part1.position * part1.depth}`)

    const part2 = input.reduce(
        (acc, curr) => {
            const direction = curr.slice(0, -2)
            let amount = parseInt(curr.slice(-1))
            switch (direction) {
                case 'forward':
                    acc.position += amount
                    acc.depth += amount * acc.aim
                    break
                case 'up':
                    amount *= -1
                case 'down':
                    acc.aim += amount
            }
            return acc
        },
        {
            position: 0,
            depth: 0,
            aim: 0
        }
    )
    console.log(`Part 2: ${part2.position * part2.depth}`)
})
