var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var numX = 3;
var numY = 3;
var checkState = [];
var squareSize = 100;

function init(){
    for (var i = 0 ; i < numY ; i++)
    for (var j = 0 ; j < numX ; j++){
        checkState[i] = [];
        checkState[i][j] = 0;
    }
}

canvas.height = numY * squareSize;
canvas.width =  numX * squareSize;
canvas.style.backgroundColor = "#fff";




function DrawTable(){
    for (var i = 0 ; i < numY ; i++){
        for (var j = 0 ; j < numX ; j++){

            ctx.fillStyle = "#FAE8E0";
            ctx.strokeStyle = "#D8A7B1";
            ctx.lineWidth = 0;
            ctx.fillRect(j * squareSize , i * squareSize , squareSize, squareSize);
            ctx.strokeRect(j * squareSize , i * squareSize , squareSize, squareSize);
            //console.log(j*100, ',',i*100 ,' ');

            if (checkState[i][j] == 1){
                ctx.font = "50px Arial";
                ctx.fillStyle = "#D8A7B1";
                // ctx.textAlign = "center";
                ctx.fillText("O", j* squareSize , i * squareSize );
                console.log(ctx.measureText("0").width,' ',ctx.measureText("0").height);
            }
            if (checkState[i][j] == 2){
                ctx.font = "50px Arial";
                ctx.fillStyle = "#D8A7B1";
                // ctx.textAlign = "center";
                ctx.fillText("O", j* squareSize + 40, i * 100 + 65);
            }
        }
        // console.log('\n');
    }
}

function mouseClick(event){
    var cRect = canvas.getBoundingClientRect();    
    var x = Math.round(event.clientX - cRect.left);
    var y = Math.round(event.clientY - cRect.top);
    // console.log(x,' ',y);
    for (var i = 0 ; i < numY ; i++)
    for (var j = 0 ; j < numX ; j++)
    {
        if (j*squareSize <=x && x<=j*squareSize + squareSize)
        if (i*squareSize <=y && y<=i*squareSize + squareSize){
            checkState[i][j] = 1;
            console.log(i,' ',j);
        }
    }
}


canvas.addEventListener('click',mouseClick);

function GameLoop(){
    DrawTable();
    requestAnimationFrame(GameLoop);
}

init();
GameLoop();