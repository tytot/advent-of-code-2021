const reader = require('../reader')

reader.getInput('inputs/_input3.txt').then((input) => {
    input = input.map((value) => value.split('').map((bit) => parseInt(bit)))
    const numBits = input[0].length
    const ascendingBits = [...Array(numBits).keys()]
    const frequencies = input.reduce((acc, curr) => {
        curr.forEach((bit, i) => {
            acc[i] += bit
        })
        return acc
    }, new Array(numBits).fill(0))
    const gamma = parseInt(frequencies.map((sum) => (sum > input.length / 2 ? 1 : 0)).join(''), 2)
    // flip all bits
    const epsilon = ~gamma & ((1 << numBits) - 1)
    console.log(`Part 1: ${gamma * epsilon}`)

    const infrequencies = frequencies.slice()
    let o2Filter = input
    let cO2Filter = input
    ascendingBits.some((i) => {
        const desired = frequencies[i] >= o2Filter.length / 2
        o2Filter = o2Filter.filter((value) => {
            if (value[i] == desired) {
                return true
            }
            value.forEach((bit, j) => {
                frequencies[j] -= bit
            })
            return false
        })
        return o2Filter.length === 1
    })
    const o2 = parseInt(o2Filter[0].join(''), 2)
    ascendingBits.some((i) => {
        const desired = infrequencies[i] < cO2Filter.length / 2
        cO2Filter = cO2Filter.filter((value) => {
            if (value[i] == desired) {
                return true
            }
            value.forEach((bit, j) => {
                infrequencies[j] -= bit
            })
            return false
        })
        return cO2Filter.length === 1
    })
    const cO2 = parseInt(cO2Filter[0].join(''), 2)
    console.log(`Part 2: ${o2 * cO2}`)
})
