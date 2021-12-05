const reader = require('../reader')

reader.getInput('inputs/_input4.txt').then((input) => {
    const draws = input
        .shift()
        .split(',')
        .map((number) => parseInt(number))
    let boards = []
    ;[...Array(input.length / 6).keys()]
        .map((i) => i * 6)
        .forEach((i) => {
            boards.push(
                input.slice(i + 1, i + 6).map((row) =>
                    row
                        .trimLeft()
                        .split(/\s+/)
                        .map((number) => parseInt(number))
                )
            )
        })
    const drawnNumbers = new Set()
    const isBingo = (board) =>
        board.some((row) => row.every((number) => drawnNumbers.has(number))) ||
        [0, 1, 2, 3, 4].some((i) => board.every((row) => drawnNumbers.has(row[i])))
    const sumUnmarked = (board) =>
        board.reduce(
            (acc1, row) =>
                acc1 +
                row.reduce((acc2, number) => acc2 + (!drawnNumbers.has(number) ? number : 0), 0),
            0
        )

    const winningDraw = draws.find((draw) => {
        drawnNumbers.add(draw)
        winningBoard = boards.find((board) => isBingo(board))
        if (winningBoard) return true
    })
    console.log(`Part 1: ${sumUnmarked(winningBoard) * winningDraw}`)

    drawnNumbers.clear()
    let losingBoard
    const losingDraw = draws.find((draw) => {
        drawnNumbers.add(draw)
        const filteredBoards = boards.filter((board) => !isBingo(board))
        if (boards.length === 1 && filteredBoards.length === 0) {
            losingBoard = boards[0]
            return true
        }
        boards = filteredBoards
    })
    console.log(`Part 2: ${sumUnmarked(losingBoard) * losingDraw}`)
})
