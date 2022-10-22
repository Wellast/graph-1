// setTimeout(() => document.location.reload(), 5000);

const MIN_WIDTH = 5
const MAX_WIDTH = 10
const MIN_HEIGHT = 5
const MAX_HEIGHT = 10

const WIDTH = 6
const HEIGHT = 6

let coords = [
    { x: 50,  y: 390, id: 1 },
    { x: 260, y: 450, id: 2 },
    { x: 230, y: 220, id: 3 },
    { x: 450, y: 200, id: 4 },
    { x: 70,  y: 100, id: 5 },
    { x: 300, y: 40,  id: 6 },
]

let adjacencyMatrixRoutes = [
/*         1  2  3  4  5  6  */
/* 1 */  [ 0, 0, 1, 0, 0, 0 ],
/* 2 */  [ 0, 0, 0, 0, 0, 0 ],
/* 3 */  [ 0, 0, 0, 1, 0, 1 ],
/* 4 */  [ 0, 0, 0, 0, 0, 1 ],
/* 5 */  [ 0, 0, 0, 0, 0, 0 ],
/* 6 */  [ 0, 0, 0, 0, 0, 0 ],
]

function init() {
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
                    td.classList.add('black')
                    td.innerHTML = 1
                } else {
                    td.classList.add('white')
                    td.innerHTML = 0
                }
                
                td.classList.add('square')
                td.classList.add('pointer')
                td.id = `td_${x}-${y}`
                tr.appendChild(td)

                td.addEventListener('click', (ev) => {
                    const el = ev.target
                    const [x, y] = `${el.id}`.slice(3).split('-').map((el) => +el)
                    if (el.classList.contains('white')) {
                        el.classList.remove('white')
                        el.classList.add('black')
                        el.innerHTML = 1
                        adjacencyMatrixRoutes[x-1][y-1] = 1
                    } else {
                        el.classList.add('white')
                        el.classList.remove('black')
                        el.innerHTML = 0
                        adjacencyMatrixRoutes[x-1][y-1] = 0
                    }
                    clearCanvas()
                    drawEdges(coords, adjacencyMatrixRoutes)
                    drawNodes(coords)
                });
            })
        }
        document.getElementById('grid').appendChild(tr);
        document.getElementById('find_path_button').disabled = false;
    })
    RunButtonInit()
}

function RunButtonInit() {
    const runBtn = document.getElementById('find_path_button');
    runBtn.addEventListener('click', () => {
        const speed = +document.getElementById('speed').value
        if (speed < 50 || speed > 10000) {
            alert(`Speed must be between 50 and 10,000`)
            return
        }
        const answer = calculatePaths(adjacencyMatrixRoutes)
        alert(answer[adjacencyMatrixRoutes.length])
    })
}

function calculatePaths(matrix) {
    const weights = { 1: 1 }
 
    function getPaths(id) {
        if (weights[id]) {
            return [weights[id]]
        }
        const entry = matrix.map((row, idx) => row[id-1] === 1 ? idx+1 : 0).filter((el) => el !== 0)
        console.log(id, entry)
        let cw = entry.map((el) => {
            if (!weights[el]) {
                let newW = getPaths(el).reduce((previousValue, currentValue) => weights[previousValue] + weights[currentValue])
                console.log(`weights[${el}] = ${newW}`)
                weights[el] = newW
                return weights[el]
            }
            return weights[el]
        })

        // console.log('cw', cw, cw.reduce((previousValue, currentValue) => previousValue + currentValue))
        return cw
    }

    weights[matrix.length] = getPaths(matrix.length).reduce((previousValue, currentValue) => previousValue + currentValue)
    return weights
}

init()
