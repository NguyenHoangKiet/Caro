var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


// var numX = 3;
// var numY = 3;
var numX = 6;
var numY = 6;
var checkState = [];
var squareSize = 100;
var gameState = true;

function choice3x3(){
    numX = numY = 3;
    canvas.height = numY * squareSize;
    canvas.width =  numX * squareSize;
    init();
    gameState = true;
    console.log('3x3')
} 

function choice6x6(){
    numX = numY = 6;
    canvas.height = numY * squareSize;
    canvas.width =  numX * squareSize;
    init();
    gameState = true;
    console.log('6x6')
} 

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


var direction = [
    {
        x : 1,
        y : 0
    },
    {
        x : 0,
        y : 1
    },
    {
        x : 1,
        y : 1
    },
]


function DrawTable(){
    if (gameState == true){
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
    var rule = 3;
    for (var i = 0 ; i < numY ; i++)
    for (var j = 0 ; j < numX ; j++)
    for (var k = 0 ; k < direction.length; k++)
    {
        var playerScore = 0;
        var NPCScore = 0;
        for (var z = 0 ; z < rule ; z++){
            var inew = i + z*direction[k].x;
            var jnew = j + z*direction[k].y
            if ( inew < numY && jnew < numX)
            {
                if (checkState[inew][jnew] == 1) playerScore++;
                if (checkState[inew][jnew] == 2) NPCScore++;
            } 
        }
        if (playerScore == rule){
            alert('YOU WIN')
            gameState = false;
            return;
        }
        if (NPCScore == rule){
            alert('YOU LOOSE')
            gameState = false;
            return;
        }
    }
    }
   
}

function playerPlay(x,y){
    for (var i = 0 ; i < numY ; i++)
    for (var j = 0 ; j < numX ; j++)
    {
        if (j*squareSize <=x && x<=j*squareSize + squareSize)
        if (i*squareSize <=y && y<=i*squareSize + squareSize)
        if (checkState[i][j] == 0 ){
            checkState[i][j] = 1;   
            NPCPlay();
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
    console.log(x,' ',y)
    playerPlay(x,y);
}


canvas.addEventListener('click',mouseClick);


// Game 
function GameLoop(){
    var inputGroupSelect01 = document.getElementById("inputGroupSelect01");
    if (inputGroupSelect01.selectedIndex == 1) {
        choice3x3();
        inputGroupSelect01.selectedIndex = 0 ;
    }
    if (inputGroupSelect01.selectedIndex == 2) {
        choice6x6();
        inputGroupSelect01.selectedIndex = 0 ;
    }
    DrawTable();
    requestAnimationFrame(GameLoop);
}

init();
//console.log(checkState);
GameLoop();
