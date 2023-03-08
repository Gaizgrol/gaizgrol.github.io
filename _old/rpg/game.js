class Item {

    edx = 0;
    edy = 0;

    constructor(image) {

        this.sprite = image;
        this.enchantSprite = null;

        this.surface = document.createElement("canvas");
        this.surface.width = image.width;
        this.surface.height = image.height;

        this.ctx = this.surface.getContext("2d");

    }


    draw(x,y) {

        this.ctx.clearRect(0, 0, this.surface.width, this.surface.height)
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.drawImage(this.sprite, 0, 0);
        this.ctx.globalCompositeOperation = "multiply";

        for (let ey = -1; ey <= 1; ey++) {
            for (let ex = -1; ex <= 1; ex++) {
                this.ctx.drawImage(this.enchantSprite, this.edx + ex*this.enchantSprite.width, this.edy + ey*this.enchantSprite.height);
            }    
        }

        this.ctx.globalCompositeOperation = "destination-in";
        this.ctx.drawImage(this.sprite, 0, 0);

        this.edx = ( this.edx + 0.25 ) % this.enchantSprite.width;
        this.edy = ( this.edy - 0.25 ) % this.enchantSprite.height;

        ctx.drawImage(this.surface, x, y);

    }

}

// Canvas do jogo e do jogo escalado
/**@type {HTMLCanvasElement}        */   var game = document.createElement("canvas");
/**@type {HTMLCanvasElement}        */   var screen = document.getElementById("screen");

// Contexto de desenho dos dois canvas
/**@type {CanvasRenderingContext2D} */   var ctx = game.getContext('2d');
/**@type {CanvasRenderingContext2D} */   var screenCtx = screen.getContext('2d');

// Resolução do jogo
game.width = 320;
game.height = 240;

// Tamanho dos blocos em pixels
var blockSize = 16;

console.log( "Resolução do jogo: "+ game.width +"x"+ game.height );

// Tamanho da janela do navegador
var ww = window.innerWidth;
var wh = window.innerHeight;

console.log( "Resolução interna da tela: "+ ww +"x"+ wh );

// Calculamos a maior resolução que o navegador pode desenhar, mantendo a proporção sem pixels "quebrados"
var wscale = Math.max( 1, Math.floor( ww/game.width ) );
var hscale = Math.max( 1, Math.floor( wh/game.height ) );

var sscale = Math.min( wscale, hscale );

console.log( "Resolução esticada disponível: "+ sscale*game.width +"x"+ sscale*game.height );

// Resolução esticada
screen.width = sscale*game.width;
screen.height = sscale*game.height;

// Coordenadas da câmera
var camx = 0;
var camy = 0;

// Carregaremos as imagens do jogo
var game_images = [
    // Itens
    "assets/items/sword.png",
    // Blocos
    "assets/tiles/grass.png",
    // UI
    "assets/ui/slot.png",
    "assets/ui/enchant.png",
];

var loaded_images = 0;

console.log( "Carregando imagens..." );

for ( let i = 0; i < game_images.length; i++ ) {

    let path = game_images[i].toLowerCase();

    game_images[i] = new Image();

    game_images[i].onload = () => {
        loaded_images++;
        console.log( Math.floor( (loaded_images/game_images.length) * 100 ) + "% (" + path + " carregada)" )
    }

    game_images[i].src = path;

}

// Desligaremos o antialiasing (afinal de contas, queremos um jogo pixelado)
ctx.imageSmoothingEnabled = false;
screenCtx.imageSmoothingEnabled = false;

var sword = null;

var hasLoaded = false;

loop();

function loop() {

    if ( loaded_images == game_images.length && !hasLoaded ) {
        
        hasLoaded = true;

        sword = new Item( game_images[0] );
        sword.enchantSprite = game_images[3];

    }

    if ( loaded_images == game_images.length ) {
        render();
    }

    requestAnimationFrame(loop);

}

var px = game.width/2;
var py = game.height/2;

function render() {

    // Desligando antialiasing (afinal, queremos um jogo pixelado)

    ctx.clearRect( 0, 0, game.width, game.height );
    ctx.fillStyle = "#000";
    ctx.fillRect( 0, 0, game.width, game.height );

    for ( let y = 0; y < game.height/blockSize; y++ ) {
        for ( let x = 0; x < game.width/blockSize; x++ ) {
            ctx.drawImage(game_images[1], x*blockSize - camx, y*blockSize - camy, blockSize, blockSize);
        }
    }

    ctx.drawImage(game_images[0], px - camx, py - camy, blockSize, blockSize);

    sword.draw(0, game.height - 16);

    // Resolução grande!
    screenCtx.drawImage( game, 0, 0, screen.width, screen.height );

}

function l() {
    px -= blockSize;
    camx -= blockSize;
}

function r() {
    px += blockSize;
    camx += blockSize;
}

function u() {
    py -= blockSize;
    camy -= blockSize;
}

function d() {
    py += blockSize;
    camy += blockSize;
}