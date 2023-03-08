// Canvas do Random Noise
/** @type {HTMLCanvasElement} */
var randomCanvas = document.getElementById("randomNoiseCanvas");
var randomCtx = randomCanvas.getContext("2d");

// Canvas do Perlin Noise
/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("perlinNoiseCanvas");
var ctx = canvas.getContext("2d");

generateRandomNoise();
generatePerlinNoise();

function generateRandomNoise() {

    // Canvas branco
    randomCtx.fillStyle = "#FFFFFF";
    randomCtx.beginPath();
    randomCtx.rect(0,0,randomCanvas.width, randomCanvas.height);
    randomCtx.fill();

    // Gerando números aleatórios
    for (let y=0; y<randomCanvas.height; y++) {

        for (let x=0; x<randomCanvas.width; x++) {

            let gray = Math.round( Math.random() * 255 );

            randomCtx.fillStyle = "rgba("+gray+","+gray+","+gray+","+"255"+")";
            randomCtx.beginPath();
            randomCtx.rect(x, y, 1, 1);
            randomCtx.fill();

        }

    }

}

function generatePerlinNoise() {

    // Canvas branco
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(0,0,randomCanvas.width, randomCanvas.height);
    ctx.fill();

    /*let nPoints = 50;
    let points = [];

    // Pontos aleatórios no mapa
    for (let i=0; i<nPoints; i++) {

        points.push({
            x: Math.round( Math.random() * 256 ),
            y: Math.round( Math.random() * 256 ),
        });

    }


    for (let point of points) {

        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.rect(point.x, point.y, 1, 1);
        ctx.fill();

    }*/

}