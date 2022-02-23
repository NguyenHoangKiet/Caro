var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var numX = 3;
var numY = 3;
var checkState = [];
var squareSize = 100;

function init(){
    for (var i = 0 ; i < numY ; i++){
        checkState[i] = [];
        for (var j = 0 ; j < numX ; j++){
            checkState[i][j] = 0;
        }
    }
}

// Inintalize canvas
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
                ctx.fillText("X", j* squareSize + 32 , i * squareSize + 65 );
               
            }
            if (checkState[i][j] == 2){
                ctx.font = "50px Arial";
                ctx.fillStyle = "#D8A7B1";
                // ctx.textAlign = "center";
                ctx.fillText("O", j* squareSize + 32, i * squareSize + 65);
            }
        }
    
    }
}

function playerPlay(x,y){
    for (var i = 0 ; i < numY ; i++)
    for (var j = 0 ; j < numX ; j++)
    {
        if (j*squareSize <=x && x<=j*squareSize + squareSize)
        if (i*squareSize <=y && y<=i*squareSize + squareSize){
            checkState[i][j] = 1;   
            return;
        }
    }
}

function NPCPlay(){

    var xNPC = Math.floor(Math.random() * numX);
    var yNPC = Math.floor(Math.random() * numY);

    var turnPlayed = 0;
    for (var i = 0 ; i < numY ; i++)
    for (var j = 0 ; j < numX ; j++)
    {
        if (checkState[i][j]!=0){
            turnPlayed++;
        }
    }

    if (turnPlayed == numX * numY) {
        console.log('Finished',' ',turnPlayed,' ',numX * numY);
        console.log(checkState);
        return;
    }

    while (checkState[yNPC][xNPC] != 0){
        xNPC = Math.floor(Math.random() * numX);
        yNPC = Math.floor(Math.random() * numY);
    }

    checkState[yNPC][xNPC] = 2;
}
function mouseClick(event){
    var cRect = canvas.getBoundingClientRect();    
    var x = Math.round(event.clientX - cRect.left);
    var y = Math.round(event.clientY - cRect.top);
    playerPlay(x,y);
    NPCPlay();
}


canvas.addEventListener('click',mouseClick);


// Game 
function GameLoop(){
    DrawTable();
    requestAnimationFrame(GameLoop);
}

init();
//console.log(checkState);
GameLoop();