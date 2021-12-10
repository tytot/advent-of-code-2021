const reader = require('../reader')

reader.getInput('inputs/input10.txt').then((input) => {
    const bracketMap = new Map([
        [')', '('],
        [']', '['],
        ['}', '{'],
        ['>', '<'],
    ])
    const errorScoreMap = new Map([
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137],
    ])
    const incompleteStacks = []
    const part1 = input.reduce((acc, line) => {
        const stack = []
        const firstIllegal = line.split('').find((char) => {
            if (bracketMap.has(char)) {
                if (bracketMap.get(char) !== stack.pop()) {
                    return true
                }
            } else {
                stack.push(char)
            }
        })
        if (firstIllegal === undefined) {
            incompleteStacks.push(stack)
        }
        return acc + (errorScoreMap.get(firstIllegal) ?? 0)
    }, 0)
    console.log(`Part 1: ${part1}`)

    const reverseBracketmap = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>'],
    ])
    const autocompleteScoreMap = new Map([
        [')', 1],
        [']', 2],
        ['}', 3],
        ['>', 4],
    ])
    const completionScores = incompleteStacks.map((stack) =>
        stack
            .reverse()
            .map((char) => reverseBracketmap.get(char))
            .reduce((acc, char) => acc * 5 + autocompleteScoreMap.get(char), 0)
    ).sort((a, b) => a - b)
    console.log(`Part 2: ${completionScores[(completionScores.length - 1) / 2]}`)
})
