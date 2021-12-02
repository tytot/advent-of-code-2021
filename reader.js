const fs = require('fs')
const readline = require('readline')

exports.getInput = async function (path) {
    const fileStream = fs.createReadStream(path)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const input = []
    for await (const line of rl) {
        input.push(line)
    }
    return input
}