const MIN_WIDTH = 5
const MAX_WIDTH = 100
const MIN_HEIGHT = 5
const MAX_HEIGHT = 100

let nextStepInterval

function init() {
    CreateButtonInit();
    RunButtonInit()
}

function CreateButtonInit() {
    document.getElementById('create_grid_button').addEventListener('click', () => {
        document.getElementById('grid').innerHTML = '';
        const width = +document.getElementById('width').value
        const height = +document.getElementById('height').value

        if (width < MIN_WIDTH || width > MAX_WIDTH) {
            alert(`width must be between ${MIN_WIDTH} and ${MAX_WIDTH}`)
            return
        }
        if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
            alert(`height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT}`)
            return
        }

        let x = 0, y = 0
        Array(width).fill(0).forEach(() => {
            x++
            y = 0
            const tr = document.createElement('tr')
            {
                Array(height).fill(0).forEach(() => {
                    y++
                    const td = document.createElement('td')
                    td.classList.add('square')
                    td.classList.add('white')
                    td.classList.add('pointer')
                    td.id = `td_${x}-${y}`
                    td.innerHTML = 0
                    tr.appendChild(td)

                    if (x === 1 && y === 1) {
                        td.classList.remove('white')
                        td.classList.add('blue')
                        td.classList.remove('pointer')
                        return
                    }
                    if (x === width && y === height) {
                        td.classList.remove('white')
                        td.classList.add('red')
                        td.classList.remove('pointer')
                        return
                    }
                    td.addEventListener('click', (ev) => {
                        const el = ev.target
                        if (el.classList.contains('white')) {
                            el.classList.remove('white')
                            el.classList.add('black')
                            el.innerHTML = 1
                        } else {
                            el.classList.add('white')
                            el.classList.remove('black')
                            el.innerHTML = 0
                        }
                    });
                })
            }
            document.getElementById('grid').appendChild(tr);
            document.getElementById('find_path_button').disabled = false;
        })
    });
}

function RunButtonInit() {
    const runBtn = document.getElementById('find_path_button');
    runBtn.addEventListener('click', () => {
        const speed = +document.getElementById('speed').value
        if (speed < 50 || speed > 10000) {
            alert(`Speed must be between 50 and 10000`)
            return
        }
        runBtn.disabled = true
        document.getElementById('create_grid_button').disabled = true
        nextStepInterval = setInterval(nextStep, speed);
    })
}

let lastVisit = [{ x: 1, y: 1 }]
const visited = {}

function nextStep() {
    const width = +document.getElementById('width').value
    const height = +document.getElementById('height').value

    if (!lastVisit.length) {
        clearInterval(nextStepInterval)
        alert('NO PATH FOUND')
        return
    }

    const currentVisit = []
    lastVisit.forEach((node) => {
        if (visited[`${width}-${height}`]) {
            return
        }
        if ((node.x+1 === width && node.y === height) || (node.x === width && node.y+1 === height)) {
            clearInterval(nextStepInterval)
            visited[`${width}-${height}`] = { x: node.x, y: node.y }
            drawFinalPath(width, height)
            // alert('DONE!')
            return
        }
        if (isAvailable(node.x+1, node.y)) {
            visit(node.x+1, node.y, node.x, node.y)
            currentVisit.push({x: node.x+1, y: node.y})
        }
        if (isAvailable(node.x, node.y+1)) {
            visit(node.x, node.y+1, node.x, node.y)
            currentVisit.push({x: node.x, y: node.y+1})
        }
        if (isAvailable(node.x-1, node.y)) {
            visit(node.x-1, node.y, node.x, node.y)
            currentVisit.push({x: node.x-1, y: node.y})
        }
        if (isAvailable(node.x, node.y-1)) {
            visit(node.x, node.y-1, node.x, node.y)
            currentVisit.push({x: node.x, y: node.y-1})
        }
    })
    lastVisit = currentVisit
}

function isAvailable(x, y) {
    const width = +document.getElementById('width').value
    const height = +document.getElementById('height').value
    if (x > width || x <= 0 || y > height || y <= 0) {
        // console.log(y, x, 'BORDER EDGE')
        return false
    }
    const cell = document.getElementById(`td_${x}-${y}`).innerText
    if (cell === '1') {
        // console.log(y, x, 'BORDER BLACK')
        return false
    }
    if (visited[`${x}-${y}`]) {
        // console.log(y, x, 'VISITED')
        return false
    }
    return true
}

function visit(x, y, prevX, prevY) {
    if (visited[`${x}-${y}`]) {
        return
    }
    visited[`${x}-${y}`] = { x: prevX, y: prevY }
    const td = document.getElementById(`td_${x}-${y}`)
    if (x === 1 && y === 1) {
        return
    }
    td.classList.remove('white')
    td.classList.add('green')
}

function drawFinalPath(width, height) {
    function drawNode(x, y) {
        if (x === 1 && y === 1) {
            return
        }
        const td = document.getElementById(`td_${x}-${y}`)
        td.classList.remove('green')
        td.classList.add('purple')
        drawNode(visited[`${x}-${y}`].x, visited[`${x}-${y}`].y)
    }

    console.log(visited)
    drawNode(visited[`${width}-${height}`].x, visited[`${width}-${height}`].y)
}

init();
