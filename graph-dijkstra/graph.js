const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawNodes(coords) {
    coords.forEach( (node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = 'black'
        ctx.font = "29px Arial"
        ctx.fillText(node.id, node.x - 7, node.y + 10)
    })
}

function drawEdges(coords, adjacencyMatrix) {
    function canvasLine(fromx, fromy, tox, toy) {
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
    }

    coords.forEach( (node) => {
        adjacencyMatrix[node.id-1].forEach((el, idx) => {
            if (el === 1) {
                const to = coords.find((el) => el.id - 1 === idx)
                canvasLine(node.x, node.y, to.x, to.y)
            }
        })
    })
    ctx.stroke();
}

function drawWeights(coords, matrix, weights) {
    function numberInTheMiddle(fromx, fromy, tox, toy, txt) {
        ctx.fillStyle = 'green'
        ctx.font = '29px Arial'
        const betweenX = Math.min(fromx, tox) + (Math.max(fromx, tox) - Math.min(fromx, tox)) / 2
        const betweenY = Math.min(fromy, toy) + (Math.max(fromy, toy) - Math.min(fromy, toy)) / 2
        ctx.fillText(txt, betweenX, betweenY)
    }

    coords.forEach( (node) => {
        matrix[node.id-1].forEach((el, idx) => {
            if (el === 1) {
                const to = coords.find((el) => el.id - 1 === idx)
                numberInTheMiddle(node.x, node.y, to.x, to.y, weights[node.id-1][idx])
            }
        })
    })
    ctx.stroke();
}

drawEdges(coords, adjacencyMatrixRoutes)
drawNodes(coords)
drawWeights(coords, adjacencyMatrixRoutes, adjacencyMatrixWeights)
