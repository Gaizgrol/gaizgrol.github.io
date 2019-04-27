/**@type {HTMLCanvasElement} */  var c;
/**@type {HTMLCanvasElement} */  var c2;


/**@type {CanvasRenderingContext2D} */  var ctx;
/**@type {CanvasRenderingContext2D} */  var ctx2;

var cpx = [];
var cpx2 = [];

var hasDeleted = false;

var oldTime = Date.now();
var currentTime = 0;
var deltaTime = 0;

function updateText() {

    let t = document.getElementById("text");
    let tf = document.getElementById("text-field");

    if (!hasDeleted && tf.value!="") {

        t.innerHTML = tf.value.replace(/\n/g, '<br/>');

    }

}

function thanos() {

    let t = document.getElementById("text");
    let b = document.getElementById("button");

    if (t.innerHTML!="") {

        hasDeleted = true;
    
        html2canvas(t).then(
            (canvas) => {
                t.replaceWith(canvas);
                t.setAttribute("id", "text");
                c = canvas;
                ctx = canvas.getContext('2d');
                generatePixelArray();

                html2canvas(b).then(
                    (canvas2) => {
                        b.replaceWith(canvas2);
                        b.setAttribute("id", "button");
                        c2 = canvas2;
                        ctx2 = canvas2.getContext('2d');
                        generatePixelArray2();
                        loop();
                    }
                );
            }
        );
    }

}

function generatePixelArray() {
    
    let imgData = ctx.getImageData(0, 0, c.width, c.height);

    for (let h = 0; h < c.height; h++) {

        for (let w = 0; w < c.width; w++) {

            let i = ( h*c.width + w ) * 4;
            if (imgData.data[i] == 255 && imgData.data[i+1] == 255 && imgData.data[i+2] == 255 && imgData.data[i+3] == 255) {
                continue;
            } else {
                cpx.push({
                    r: imgData.data[i],
                    g: imgData.data[i+1],
                    b: imgData.data[i+2],
                    a: imgData.data[i+3],
                    x: w,
                    y: h,
                    dx: -16-Math.random()*48,
                    dy: -16+Math.random()*32,
                    timer: w + c.width/10,
                });
            }

        }

    }
    
}

function generatePixelArray2() {
    
    let imgData = ctx2.getImageData(0, 0, c2.width, c2.height);

    for (let h = 0; h < c2.height; h++) {

        for (let w = 0; w < c2.width; w++) {

            let i = ( h*c2.width + w ) * 4;
            if (imgData.data[i] == 255 && imgData.data[i+1] == 255 && imgData.data[i+2] == 255 && imgData.data[i+3] == 255) {
                continue;
            } else {
                cpx2.push({
                    r: imgData.data[i],
                    g: imgData.data[i+1],
                    b: imgData.data[i+2],
                    a: imgData.data[i+3],
                    x: w,
                    y: h,
                    dx: -Math.random()*48,
                    dy: -16+Math.random()*32,
                    timer: w + c2.width/10,
                });
            }

        }

    }
    
}

function loop() {

    currentTime = Date.now();
    deltaTime = currentTime - oldTime;
    oldTime = currentTime;

    let dt = deltaTime/1000;

    ctx.fillStyle = "rgba(255,255,255,255)";
    ctx.fillRect(0,0,c.width, c.height);

    for (let i=0; i<cpx.length; i++) {
        
        ctx.fillStyle = "rgba("+cpx[i].r+","+cpx[i].g+","+cpx[i].b+","+cpx[i].a+")";
        ctx.fillRect(cpx[i].x, cpx[i].y, 1, 1);

        if (cpx[i].timer <= 0) {

            cpx[i].x += cpx[i].dx * dt;
            cpx[i].y += cpx[i].dy * dt;
            cpx[i].a = Math.max(0, Math.round(cpx[i].a - 64 * dt));

        } else {

            cpx[i].timer -= c.width/10 * dt;

        }
    }

    ctx2.fillStyle = "rgba(255,255,255,255)";
    ctx2.fillRect(0,0,c2.width, c2.height);

    for (let i=0; i<cpx2.length; i++) {
        
        ctx2.fillStyle = "rgba("+cpx2[i].r+","+cpx2[i].g+","+cpx2[i].b+","+cpx2[i].a+")";
        ctx2.fillRect(cpx2[i].x, cpx2[i].y, 1, 1);

        if (cpx2[i].timer <= 0) {

            cpx2[i].x += cpx2[i].dx * dt;
            cpx2[i].y += cpx2[i].dy * dt;
            cpx2[i].a = Math.max(0, Math.round(cpx2[i].a - 64 * dt));

        } else {

            cpx2[i].timer -= c2.width/10 * dt;

        }
    }

    requestAnimationFrame(loop);

}