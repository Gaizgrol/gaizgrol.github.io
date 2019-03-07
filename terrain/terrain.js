var canvas = document.getElementById("terrainCanvas");
var ctx = canvas.getContext("2d");

var blockSize = 16;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var n_hblocks = canvas.width / blockSize;
var n_vblocks = canvas.height / blockSize;

var grassTexture = document.getElementById('textureGrass');
var dirtTexture = document.getElementById('textureDirt');
var stoneTexture = document.getElementById('textureStone');
var woodTexture = document.getElementById('textureWood');
var leavesTexture = document.getElementById('textureLeaves');

var magmaTexture = document.getElementById('textureMagma');

var oreCoalTexture = document.getElementById('textureOreCoal');
var oreIronTexture = document.getElementById('textureOreIron');
var oreGoldTexture = document.getElementById('textureOreGold');
var oreDiamondTexture = document.getElementById('textureOreDiamond');

var rosesTexture = document.getElementById('textureRoses');
var tallGrassTexture = document.getElementById('textureTallGrass');

ctx.fillStyle = "#779AFF";
ctx.beginPath();
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fill();

let val1 = 3 + Math.random()*2;
let val2 = 1 + Math.random();

let treeSpacing = 3;

for (let i = 0; i < n_hblocks; i++){

    let baseHeight = canvas.height/2;
    let topBlock = baseHeight - Math.round(Math.sin(i/val1) * val2) * blockSize;

    if (Math.random() < 0.1 && treeSpacing <= 0) {
        drawTree0(i * blockSize, topBlock - blockSize, 2 + Math.random() * 3);
        treeSpacing = 3;
    } else {
        treeSpacing--;
        if (Math.random() < 0.2)
            drawBlock(i * blockSize, topBlock - blockSize, rosesTexture, Math.round( Math.random() * 3 ) )
        else
            drawBlock(i * blockSize, topBlock - blockSize, tallGrassTexture, Math.round( Math.random() * 3 ) )
    }

    let lastBlock = ( canvas.height - topBlock ) / blockSize;
    let k = 0;

    for (let j = topBlock/blockSize; j < lastBlock + topBlock/blockSize; j++){

        let blockType = grassTexture;

        if (k == 0) {

            blockType = grassTexture;

        } else if (k <= 3) {

            blockType = dirtTexture;

        } else if (k <= 2*lastBlock/6 ) {

            if ( Math.random() < 0.04 )
                blockType = oreCoalTexture;
            else
                blockType = stoneTexture;
            
        } else if (k <= 3*lastBlock/6 ) {
            
            if ( Math.random() < 0.03 )
                blockType = oreIronTexture;
            else
                blockType = stoneTexture;

        } else if (k <= 4*lastBlock/6 ) {
            
            if ( Math.random() < 0.02 )
                blockType = oreGoldTexture;
            else
                blockType = stoneTexture;

        } else if ( k <= lastBlock - 2 ) {
            
            if ( Math.random() < 0.02 )
                blockType = oreDiamondTexture;
            else
                blockType = stoneTexture;

        } else {

            blockType = magmaTexture;

        }

        drawBlock(i * blockSize, j * blockSize, blockType);

        k++;

    }

}


function drawBlock(x, y, texture, index) {

    //fake3dctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    //fake3dctx.drawImage(image, place, 0, 1, image.height, x, resh/2-size/2-player.z, 1.75, size);

    //ctx.fillStyle = texture;
    //ctx.beginPath();
    //ctx.rect(x, y, blockSize, blockSize);
    //ctx.fill();
    if (index)
        ctx.drawImage(texture, blockSize*index, 0, blockSize, blockSize, x, y,  blockSize, blockSize);
    else
        ctx.drawImage(texture, 0, 0, blockSize, blockSize, x, y,  blockSize, blockSize);

}

function drawTree0(x, y, size) {

    let i;
    for (i = 0; i < size; i++){

        drawBlock(x, y - i * blockSize, woodTexture);

    }

    let top = y - i * blockSize;
    let sz = Math.max( 2, Math.ceil(size/2.5) );

    for ( i = -sz; i <= sz; i++ ) {
        for ( let j = -sz; j <= sz; j++ ) {
            if ( Math.abs(j) != sz || Math.abs(i) != sz )
                drawBlock( x - j*blockSize, top - i*blockSize, leavesTexture );
        }
    }
    
}