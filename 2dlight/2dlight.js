// Cria o canvas da iluminação
var lightingCanvas = document.createElement("canvas");
// Pega o seu contexto de desenho
var lightingCtx = lightingCanvas.getContext("2d");

// Cria o canvas da iluminação
var backgroundCanvas = document.createElement("canvas");
// Pega o seu contexto de desenho
var backgroundCtx = backgroundCanvas.getContext("2d");

// Cria o canvas final (desenharemos a objetos nele e depois o canvas da iluminação em cima dele)
/**@type {HTMLCanvasElement}*/
var finalCanvas = document.getElementById("canvas");
// Pega o seu contexto de desenho
var finalCtx = finalCanvas.getContext("2d");

// Cria o canvas da luz
var light = document.createElement("canvas");
// Pega o seu contexto de desenho
var lightCtx = light.getContext("2d");

// Tamanho dos canvas
var cw = window.innerWidth;
var ch = window.innerHeight;

var lightRadius = 512;

var blockSize = 64;
var blocks = [];

for (let i = 0; i < 15; i++) {
    let bx = Math.random() * cw;
    let by = Math.random() * ch;
    blocks.push({
        x: bx,
        y: by,
        vertices: [
            {
                x: bx,
                y: by,
            },
            {
                x: bx + blockSize,
                y: by,
            },
            {
                x: bx + blockSize,
                y: by + blockSize,
            },
            {
                x: bx,
                y: by + blockSize,
            },
        ]
    });
}

console.log(blocks);

// Atribuição de tamanhos
backgroundCanvas.width = cw;
backgroundCanvas.height = ch;

lightingCanvas.width = cw;
lightingCanvas.height = ch;

finalCanvas.width = cw;
finalCanvas.height = ch;

light.width = lightRadius*2;
light.height = lightRadius*2;

// Desenhamos a raspadinha por cima de tudo
finalCtx.drawImage(lightingCanvas, 0, 0, cw, ch);

var grd = lightCtx.createRadialGradient(lightRadius, lightRadius, lightRadius/10, lightRadius, lightRadius, lightRadius);
grd.addColorStop(0, "#FFFFFFFF");
grd.addColorStop(1, "#FFFFFF00");

// Fill with gradient
lightCtx.fillStyle = grd;
lightCtx.beginPath();
lightCtx.rect(0, 0, lightRadius*2, lightRadius*2);
lightCtx.fill();

// Desenha um retângulo preto no canvas da raspadinha
backgroundCtx.fillStyle = "#00FF00";
backgroundCtx.beginPath();
backgroundCtx.rect(0, 0, cw, ch);
backgroundCtx.fill();

// Desenharemos neste evento: quando estivermos nas condições de desenho, pegaremos as coordenadas
// de clique do canvas final e passaremos estas coordenadas para o canvas da raspadinha.
finalCanvas.onmousemove = (event) => {
    draw(event.pageX, event.pageY);
}


// Isso suporta touch, não sei se o raspadinha é app ou web, de qualquer forma
// coloquei aqui pra ver se funciona (no navegador n da certo, abre pelo celular isso daqui).
finalCanvas.ontouchstart = (event) => {
//    for (let i = 0; i < event.touches.length; i++)
        draw(event.touches[0].pageX, event.touches[0].pageY);
}

finalCanvas.ontouchmove = (event) => {
//    for (let i = 0; i < event.touches.length; i++)
        draw(event.touches[0].pageX, event.touches[0].pageY);
}

finalCanvas.ontouchend = (event) => {
    lastX = undefined;
    lastY = undefined;
}

finalCanvas.onmouseleave = (event) => {
    lastX = undefined;
    lastY = undefined;
}

for (let block of blocks) {

    backgroundCtx.fillStyle = "#7F5500";
    backgroundCtx.beginPath();
    backgroundCtx.rect(block.x, block.y, blockSize, blockSize);
    backgroundCtx.fill();

}

draw(cw/2, ch/2);

// Função de desenho
function draw(x, y) {

    // Limpamos o canvas final
    lightingCtx.clearRect(0, 0, cw, ch);

    // Desenha a iluminação global
    lightingCtx.fillStyle = "#000000";
    lightingCtx.beginPath();
    lightingCtx.rect(0, 0, cw, ch);
    lightingCtx.fill();

    // Desenha a lâmpada
    lightingCtx.globalCompositeOperation = "destination-out";
    lightingCtx.drawImage(light, x - lightRadius, y - lightRadius, 2 * lightRadius, 2 * lightRadius);
    lightingCtx.globalCompositeOperation = "source-over";

    // Faz o casting de sombras
    for (let block of blocks) {

        for (let i = 0; i < block.vertices.length; i++) {

            let i_atual = i;
            let i_prox = (i+1<block.vertices.length)?(i+1):(i+1-block.vertices.length);

            let mousex = x;
            let mousey = y;


            let b = block.vertices[i_atual].x - mousex;
            let c = block.vertices[i_atual].y - mousey;

            let a = Math.sqrt( b*b + c*c );

            let inicio_atual = block.vertices[i_atual];
            let projecao_atual = {
                x: block.vertices[i_atual].x + lightRadius*Math.SQRT2*(block.vertices[i_atual].x - mousex)/a,
                y: block.vertices[i_atual].y + lightRadius*Math.SQRT2*(block.vertices[i_atual].y - mousey)/a
            };

            b = block.vertices[i_prox].x - mousex;
            c = block.vertices[i_prox].y - mousey;

            a = Math.sqrt( b*b + c*c );

            let inicio_proximo = block.vertices[i_prox];
            let projecao_proximo = {
                x: block.vertices[i_prox].x + lightRadius*Math.SQRT2*(block.vertices[i_prox].x - mousex)/a,
                y: block.vertices[i_prox].y + lightRadius*Math.SQRT2*(block.vertices[i_prox].y - mousey)/a
            };


            lightingCtx.beginPath();

            lightingCtx.moveTo(inicio_atual.x, inicio_atual.y);
            lightingCtx.lineTo(inicio_atual.x, inicio_atual.y);
            lightingCtx.lineTo(projecao_atual.x, projecao_atual.y);
            lightingCtx.lineTo(projecao_proximo.x, projecao_proximo.y);

            lightingCtx.lineTo(inicio_atual.x, inicio_atual.y);
            lightingCtx.lineTo(projecao_proximo.x, projecao_proximo.y);
            lightingCtx.lineTo(inicio_proximo.x, inicio_proximo.y);

            lightingCtx.fill();

        }

    }

    // Desenhamos a raspadinha por cima da imagem
    finalCtx.drawImage(backgroundCanvas, 0, 0)
    finalCtx.globalAlpha = 0.9;
    finalCtx.drawImage(lightingCanvas, 0, 0);
    finalCtx.globalAlpha = 1;

    // Utilizei 'globalCompositeOperation' para mudar o estilo do desenho.
    // source-over é o padrão, desenha normalmente no canvas
    // destination-out remove tudo o que tiver no canvas dentro do que foi desenhado, serve de
    // borracha
    //
    // Mais info aqui:
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

}

function point_distance(sx, sy, ex, ey) {
    let dx = sx-ex;
    let dy = sy-ey;
    return Math.sqrt( dx*dx + dy*dy );
}

// Colocamos o canvas final no documento
// (note que não colocamos o da raspadinha, só esse basta)
document.body.appendChild(finalCanvas);