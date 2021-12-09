const reader = require('../reader')

reader.getInput('inputs/_input9.txt').then((input) => {
    const point = (x, y, height, visited) => ({ x, y, height, visited })
    input = input.map((row, y) => row.split('').map((height, x) => point(x, y, parseInt(height), false)))
    const adjacencies = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ]
    const lowPoints = []
    input.forEach((row, y) =>
        row.forEach((point, x) => {
            if (adjacencies.every((offset) => (input?.[y + offset[1]]?.[x + offset[0]]?.height ?? 10) > point.height)) {
                lowPoints.push(input[y][x])
            }
        })
    )
    const part1 = lowPoints.reduce((acc, point) => acc + point.height + 1, 0)
    console.log(`Part 1: ${part1}`)

    const search = (point) => {
        if (point && !point.visited && point.height < 9) {
            point.visited = true
            return 1 + adjacencies.reduce((acc, offset) => acc + search(input?.[point.y + offset[1]]?.[point.x + offset[0]]), 0)
        }
        return 0
    }
    const basinSizes = lowPoints.map((point) => search(point)).sort((a, b) => b - a)
    console.log(`Part 2: ${basinSizes[0] * basinSizes[1] * basinSizes[2]}`)
})
