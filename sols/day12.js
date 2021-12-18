const reader = require('../reader')

reader.getInput('inputs/input12.txt').then((input) => {
    const addEdge = (graph, from, to) => {
        if (graph.has(from)) {
            graph.get(from).push(to)
        } else {
            graph.set(from, [to])
        }
    }
    const graph = input.reduce((graph, entry) => {
        const [from, to] = entry.split('-')
        addEdge(graph, from, to)
        addEdge(graph, to, from)
        return graph
    }, new Map())
    const search = (cave, destination, exception, visited = new Set([cave]), path = [cave]) => {
        if (cave === destination) {
            return exception && path.filter((c) => c === exception).length <= 1 ? 0 : 1
        }
        return graph.get(cave).reduce((acc, adj) => {
            if (!visited.has(adj)) {
                const newPath = [...path, adj]
                if (adj === adj.toLowerCase()) {
                    const newVisited = new Set(visited)
                    newVisited.add(adj)
                    acc += search(adj, destination, exception, newVisited, newPath)
                    if (exception === undefined && adj !== 'end') {
                        acc += search(adj, destination, adj, visited, newPath)
                    }
                } else {
                    acc += search(adj, destination, exception, visited, newPath)
                }
            }
            return acc
        }, 0)
    }
    console.log(`Part 1: ${search('start', 'end', 0)}`)
    console.log(`Part 2: ${search('start', 'end')}`)
})
