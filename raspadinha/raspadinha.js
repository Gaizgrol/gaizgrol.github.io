// Cria o canvas da raspadinha
var canvas = document.createElement("canvas");
// Pega o seu contexto de desenho
var ctx = canvas.getContext("2d");

// Cria o canvas final (desenharemos a imagem nele e depois o canvas da raspadinha em cima dele)
/**@type {HTMLCanvasElement}*/
var finalCanvas = document.getElementById("canvas");
// Pega o seu contexto de desenho
var finalCtx = finalCanvas.getContext("2d");


// Tamanho dos canvas
var cw = 512;
var ch = 512;

var lastX, lastY;

// Atribuição de tamanhos
canvas.width = cw;
canvas.height = ch;

finalCanvas.width = cw;
finalCanvas.height = ch;

// Desenha um retângulo cinza no canvas da raspadinha
ctx.fillStyle = "#AAAAAA";
ctx.beginPath();
ctx.rect(0, 0, cw, ch);
ctx.fill();

// Desenhamos a raspadinha por cima de tudo
finalCtx.drawImage(canvas, 0, 0);

// Imagem que iremos desenhar
var img = new Image();
img.src = "https://images.emojiterra.com/twitter/v11/512px/1f914.png";


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

// Função de desenho
function draw(x, y) {

    // Limpamos o canvas final
    finalCtx.clearRect(0, 0, cw, ch);

    // Desenhamos a imagem no canvas
    finalCtx.globalCompositeOperation = "source-over";
    finalCtx.drawImage(img, 0, 0);

    if (lastX && lastY) {

        // Apagamos um pedaço do canvas da raspadinha
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "#000000";
        /*ctx.beginPath();
        ctx.ellipse(x, y, 16, 16, 0, 0, Math.PI * 2, false);
        ctx.fill();*/

        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = 24;
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

    }

    lastX = x;
    lastY = y;

    // Desenhamos a raspadinha por cima da imagem
    finalCtx.globalCompositeOperation = "source-over";
    finalCtx.drawImage(canvas, 0, 0);

    // Utilizei 'globalCompositeOperation' para mudar o estilo do desenho.
    // source-over é o padrão, desenha normalmente no canvas
    // destination-out remove tudo o que tiver no canvas dentro do que foi desenhado, serve de
    // borracha
    //
    // Mais info aqui:
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

}

// Colocamos o canvas final no documento
// (note que não colocamos o da raspadinha, só esse basta)
document.body.appendChild(finalCanvas);