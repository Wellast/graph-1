setTimeout(() => document.location.reload(), 5000);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
    coords.forEach( (node) => {
        adjacencyMatrix[node.id-1].forEach((el, idx) => {
            console.log(node.id-1, el)
            if (el === 1) {
                ctx.moveTo(node.x, node.y)
                const to = coords.find((el) => el.id - 1 === idx)
                ctx.lineTo(to.x, to.y)
                ctx.stroke();
            }
        })
    })
}

function drawWeights() {
    
}

const coords = [
    { x: 50,  y: 390, id: 1 },
    { x: 260, y: 450, id: 2 },
    { x: 230, y: 220, id: 3 },
    { x: 450, y: 200, id: 4 },
    { x: 300, y: 40,  id: 5 },
    { x: 70,  y: 100, id: 6 },
]

const adjacencyMatrixRoutes = [
/*         1  2  3  4  5  6  */
/* 1 */  [ 0, 1, 1, 0, 0, 1 ],
/* 2 */  [ 1, 0, 1, 1, 0, 0 ],
/* 3 */  [ 1, 2, 0, 1, 0, 1 ],
/* 4 */  [ 0, 1, 1, 0, 1, 0 ],
/* 5 */  [ 0, 0, 0, 1, 0, 1 ],
/* 6 */  [ 1, 0, 1, 0, 1, 0 ],
]

const adjacencyMatrixWeights = [
/*         1  2  3  4  5  6  */
/* 1 */  [ 0, 1, 1, 0, 0, 1 ],
/* 2 */  [ 1, 0, 1, 1, 0, 0 ],
/* 3 */  [ 1, 2, 0, 1, 0, 1 ],
/* 4 */  [ 0, 1, 1, 0, 1, 0 ],
/* 5 */  [ 0, 0, 0, 1, 0, 1 ],
/* 6 */  [ 1, 0, 1, 0, 1, 0 ],
]

drawEdges(coords, adjacencyMatrixRoutes)
drawNodes(coords)
drawWeights(coords, adjacencyMatrixWeights)