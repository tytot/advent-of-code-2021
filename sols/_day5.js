const reader = require('../reader')

reader.getInput('inputs/_input5.txt').then((input) => {
    const vents = new Set()
    const twoVents = new Set()
    const diagonals = []
    const markVent = (point) => {
        if (vents.has(point)) {
            twoVents.add(point)
        } else {
            vents.add(point)
        }
    }
    input.forEach((line) => {
        const points = line
            .split(' -> ')
            .map((point) => point.split(',').map((value) => parseInt(value)))
        const [a, b] = points
        if (a[0] === b[0]) {
            const minY = Math.min(a[1], b[1])
            ;[...Array(Math.abs(b[1] - a[1]) + 1).keys()].forEach((y) =>
                markVent(`${a[0]},${y + minY}`)
            )
        } else if (a[1] === b[1]) {
            const minX = Math.min(a[0], b[0])
            ;[...Array(Math.abs(b[0] - a[0]) + 1).keys()].forEach((x) =>
                markVent(`${x + minX},${a[1]}`)
            )
        } else {
            diagonals.push(points)
        }
    })
    console.log(`Part 1: ${twoVents.size}`)

    diagonals.forEach(([a, b]) => {
        ;[...Array(Math.abs(b[1] - a[1]) + 1).keys()].forEach((i) =>
            markVent(`${a[0] < b[0] ? a[0] + i : a[0] - i},${a[1] < b[1] ? a[1] + i : a[1] - i}`)
        )
    })
    console.log(`Part 2: ${twoVents.size}`)
})
