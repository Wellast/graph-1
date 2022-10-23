const MIN_WIDTH = 5
const MAX_WIDTH = 10
const MIN_HEIGHT = 5
const MAX_HEIGHT = 10

const WIDTH = 6
const HEIGHT = 6

const _ = 0

let coords = [
    { x: 50,  y: 390, id: 1 },
    { x: 260, y: 450, id: 2 },
    { x: 230, y: 220, id: 3 },
    { x: 450, y: 200, id: 4 },
    { x: 70,  y: 100, id: 5 },
    { x: 300, y: 40,  id: 6 },
]

const adjacencyMatrixRoutes = [
/*         1  2  3  4  5  6  */
/* 1 */  [ _, 1, 1, _, 1, _ ],
/* 2 */  [ _, _, 1, 1, _, _ ],
/* 3 */  [ _, _, _, 1, 1, 1 ],
/* 4 */  [ _, _, 1, _, _, 1 ],
/* 5 */  [ _, _, 1, _, _, 1 ],
/* 6 */  [ _, _, _, _, _, _ ],
]

const adjacencyMatrixWeights = [
/*         1  2  3  4  5  6  */
/* 1 */  [ _, 9, 7, _, 1, _ ],
/* 2 */  [ 9, _, 8, 6, _, _ ],
/* 3 */  [ 7, 8, _, 1, 1, 5 ],
/* 4 */  [ _, 6, 1, _, _, 1 ],
/* 5 */  [ 1, _, 1, _, _, 4 ],
/* 6 */  [ _, _, 5, 1, 4, _ ],
]

function init() {
    drawGrid()
    RunButtonInit()
}

function drawGrid() {
    document.getElementById('grid').innerHTML = `<caption>Adjacency Matrix Routes</caption><thead><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></thead>`
    let x = 0, y = 0
    Array(WIDTH).fill(0).forEach(() => {
        x++
        y = 0
        const tr = document.createElement('tr')
        {
            Array(HEIGHT).fill(0).forEach(() => {
                y++
                const td = document.createElement('td')

                if (adjacencyMatrixRoutes[x-1][y-1] === 1) {
                    const inp = document.createElement('input')
                    inp.classList.add('inp')
                    inp.value = adjacencyMatrixWeights[x-1][y-1]
                    inp.disabled = true
                    td.classList.add('black')
                    td.innerHTML = 1
                    td.appendChild(inp)
                } else {
                    td.classList.add('white')
                    td.innerHTML = 0
                }

                td.classList.add('square')
                td.id = `td_${x}-${y}`
                tr.appendChild(td)
            })
        }
        document.getElementById('grid').appendChild(tr);
        document.getElementById('find_path_button').disabled = false;
    })
}

function RunButtonInit() {
    const runBtn = document.getElementById('find_path_button');
    runBtn.addEventListener('click', () => {
        const weigths = getShortestPath(coords, adjacencyMatrixRoutes, adjacencyMatrixWeights)
        document.getElementById('dinstance').innerHTML = weigths
    })
}

init()

function getShortestPath(coords, matrixRoutes, matrixWeights) {
    const visited = {}
    const distance = {}
    coords.forEach((el) => {
        visited[el.id] = false
        distance[el.id] = Number.MAX_SAFE_INTEGER
    })
    distance[1] = 0
    console.log(visited)
    console.log(distance)

    function visit(id) {
        visited[id] = true
        const mergedNodes = matrixRoutes[id-1].map((val, idx) => val > 0 ? idx+1 : 0).filter((el) => el > 0)
        if (mergedNodes.length) {
            console.log(`Visiting ${id}. Node connected to ${mergedNodes}`)
            const d = []
            mergedNodes.forEach((mn) => {
                if (!visited[mn]) {
                    console.log(`distance[${mn}] = ${distance[id] + matrixWeights[id-1][mn-1]}`)
                    distance[mn] = distance[id] + matrixWeights[id-1][mn-1]
                    d.push({ id: mn, distance: matrixWeights[id-1][mn-1] })
                }
            })
            d.sort((a,b) => a.distance - b.distance)
            const nextVisit = d.find((el) => !visited[el.id])
            if (nextVisit) {
                return visit(nextVisit.id)
            }
        }
        console.log(visited)
        console.log(distance)
        return
    }
    visit(1)
    return distance[coords[coords.length-1].id]
}
