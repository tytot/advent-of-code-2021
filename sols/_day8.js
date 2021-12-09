const reader = require('../reader')

reader.getInput('inputs/_input8.txt').then((input) => {
    const entries = input.map((entry) => entry.split(' | ').map((digits) => digits.split(' ')))
    const uniqueLengths = new Set([2, 3, 4, 7])
    const part1 = entries.reduce(
        (acc1, entry) => acc1 + entry[1].reduce((acc2, digit) => acc2 + (uniqueLengths.has(digit.length) ? 1 : 0), 0),
        0
    )
    console.log(`Part 1: ${part1}`)

    const diffPatterns = (patterns, condition) =>
        patterns
            .map((pattern) => pattern.split(''))
            .reduce((previous, current) => previous.filter((segment) => condition(current, segment)))
            .join('')
    const intersection = (...patterns) => diffPatterns(patterns, (current, segment) => current.includes(segment))
    const difference = (master, ...patterns) =>
        diffPatterns([master, ...patterns], (current, segment) => !current.includes(segment))

    // segment positions -> digit
    const renderMap = new Map(
        ['012456', '25', '02346', '02356', '1235', '01356', '013456', '025', '0123456', '012356'].map((key, i) => [
            key,
            i,
        ])
    )
    const part2 = entries.reduce((acc, entry) => {
        const [signalPatterns, output] = entry
        // pattern length -> array of patterns
        const lengthMap = Array.from({ length: 8 }, () => [])
        signalPatterns.forEach((pattern) => {
            lengthMap[pattern.length].push(pattern)
        })
        // segment position -> segment letter
        const segmentOrder = Array(7)
        const horizontals = intersection(...lengthMap[5])
        segmentOrder[0] = difference(lengthMap[3][0], lengthMap[2][0])
        segmentOrder[3] = intersection(horizontals, lengthMap[4][0])
        segmentOrder[6] = difference(horizontals, segmentOrder[0], segmentOrder[3])
        segmentOrder[1] = difference(lengthMap[4][0], lengthMap[2][0], segmentOrder[3])
        segmentOrder[2] = intersection(
            ...lengthMap[5].filter((pattern) => !pattern.includes(segmentOrder[1])),
            lengthMap[2][0]
        )
        segmentOrder[5] = difference(lengthMap[2][0], segmentOrder[2])
        segmentOrder[4] = difference(lengthMap[7][0], ...segmentOrder.filter((segment) => segment))
        // segment letter -> segment position
        const segmentMap = new Map(segmentOrder.map((segment, i) => [segment, i]))
        const outputValue = output.reduce((value, digit) => value + renderMap.get(
            digit.split('').map((segment) => segmentMap.get(segment)).sort((a, b) => a - b).join('')
        ), '')
        return acc + parseInt(outputValue)
    }, 0)
    console.log(`Part 2: ${part2}`)
})
