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
    function canvasArrow(fromx, fromy, tox, toy) {
        if (tox - fromx > 100) {
            tox = tox - 15
        }
        if (toy - fromy > 100) {
            toy = toy - 15
        }
        if (tox - fromx < -100) {
            tox = tox + 15
        }
        if (toy - fromy < -100) {
            toy = toy + 15
        }
        var headlen = 10;
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
      }

    coords.forEach( (node) => {
        adjacencyMatrix[node.id-1].forEach((el, idx) => {
            if (el === 1) {
                const to = coords.find((el) => el.id - 1 === idx)
                canvasArrow(node.x, node.y, to.x, to.y)
            }
        })
    })
    ctx.stroke();
}


drawEdges(coords, adjacencyMatrixRoutes)
drawNodes(coords)
