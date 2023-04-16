/**
 * @type {HTMLCanvasElement}
 */

//LLAMADO AL HTML

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

//VARIABLES

let canvasSize;
let elementSize; 
let level = 0; 
let lives = 3; 
let starTime; 
let timeInterval; 


// OBJECTOS

const playerPosition = { 
};


const giftPosition = {
    x: undefined,
    y: undefined,
};

//VARIABLE

let enemyPositions = []; 

//ADDEVENLISTENER

window.addEventListener('load',setCanvasSize); 
window.addEventListener('resize',setCanvasSize); 


//FUNCION TAMAÑO DEL CANVAS

function setCanvasSize (){

    if(window.innerHeight > window.innerWidth){
     canvasSize = window.innerWidth * 0.8;
    }else{
     canvasSize = window.innerHeight * 0.8;
    };
    
    canvas.setAttribute('width', canvasSize.toFixed(0)); 
    canvas.setAttribute('height', canvasSize.toFixed(0)); 

    elementSize = (canvasSize / 10)-1;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    starGame();
};

//FUNCION COMENZAR EL JUEGO

function starGame(){

    game.font = elementSize * 0.9 + 'px verdana';


    const map = maps[level]; 
    if(!map){ 
        gameWIn(); 
        return; 
    };

    totalLives();

    if(!starTime){ 
        starTime = Date.now(); 
        timeInterval = setInterval(intervalTime,100); 

        showRecord();
    }

    const mapsRows = map.trim().split('\n'); 

    const mapsRowsCols = mapsRows.map(row => row.trim().split('')); 
    enemyPositions = []; 
  
    game.clearRect(0,0,canvasSize,canvasSize); 
    mapsRowsCols.forEach((row, rowI) => {  
        row.forEach( (col, colI) =>{

            const colEmojis = emojis[col]; 
            const posX = elementSize * (colI ); 
            const posY = elementSize * (rowI + 0.9); 


            if (col == 'O') {
                if(!playerPosition.x &&  !playerPosition.y ){ 

                    playerPosition.x = posX; 
                    playerPosition.y = posY;
                    console.log({playerPosition});
                    console.log({posX,posY});
                };
              }else if (col == 'I') { 
                    giftPosition.x = posX;
                    giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({ 
                    x: posX,
                    y: posY,
                });
            };

            game.fillText(colEmojis,posX,posY);
           
        });
    });

    movePLayer(); 
};

//FUNCION MOVER AL JUGADOR

function movePLayer (){ 
    const giftCoallitionX = giftPosition.x.toFixed(0) == playerPosition.x.toFixed(0); 
    const giftCoallitionY = giftPosition.y.toFixed(0) == playerPosition.y.toFixed(0);
    const giftCollition = giftCoallitionX && giftCoallitionY; 

    if(giftCollition){ 
        levelWin();
    };

    const enemyCoallition = enemyPositions.find(enemy => { 
        const enemyCoallitionX = enemy.x.toFixed(0) == playerPosition.x.toFixed(0);
        const enemyCoallitionY = enemy.y.toFixed(0) == playerPosition.y.toFixed(0);
        return  enemyCoallitionX && enemyCoallitionY;
    });

    if(enemyCoallition){ 
            levelFail();
    };
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)
    
};

//ADDEVENLSITENER

window.addEventListener('keydown',movesKeyBoard);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//FUNCION MOVIMIENTOS DEL TECLADO

function movesKeyBoard (event){
    if(event.key =="ArrowUp")moveUp();
    else if (event.key =="ArrowLeft")moveLeft();
    else if (event.key =="ArrowRight")moveRight();
    else if (event.key =="ArrowDown")moveDown();
};


//FUNCION GANAR EL NIVEL

function levelWin(){ 
    level ++; 
    starGame(); 
};

//FUNCION GANAR EL JUEGO

function gameWIn(){ 
    console.log('Terminaste el Juego');
    clearInterval(timeInterval); 

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - starTime;

    if(recordTime){
        if(recordTime >= playerTime ){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'SUPERASTE EL RECORD !!!';
        } else {
            pResult.innerHTML = 'Lo siento, NO superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Es tu primera vez? Mucha suerte!!!';
    };

    console.log({recordTime,playerTime});
};

//FUNCION MOSTRAR EL RECORD

function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time'); 
};

//FUNCION NIVEL PERDIDO

function levelFail(){ 
    console.log('Colisionaste: perdiste :(');
    
    lives--; 
    console.log(lives);
    if(lives <= 0){
       level = 0;
       lives = 3;
       starTime = undefined; 
    };


    
    playerPosition.x = undefined;
    playerPosition.y = undefined;


    starGame();
};

//FUNCION INTERVALO DE TIEMPO

function intervalTime(){
    spanTime.innerHTML = formatTime(Date.now() - starTime); 
};

//FUNCION TOTAL DE VIDAS

function totalLives(){
    
    spanLives.innerHTML = emojis["HEART"].repeat(lives);
};

//FUNCIONES DE LOS MOVIMIENTOS ARRIBA,ABAJO,DERECHA E IZQUIERA

function moveUp(){
   if(playerPosition.y - elementSize <= 0){ 
        console.log('OUT'); 
   }else{
        playerPosition.y -= elementSize; 
        starGame(); 
   }

};

function moveLeft(){
    if(playerPosition.x - elementSize < 0){
        console.log('OUT');
   }else{
        playerPosition.x -= elementSize;
        starGame();
   }
};

function moveRight(){
    if(playerPosition.x + elementSize > canvasSize - elementSize){
        console.log('OUT');
   }else{
        playerPosition.x += elementSize;
        starGame();
   }

};

function moveDown(){
    if(playerPosition.y + elementSize > canvasSize ){
        console.log('OUT');
   }else{
    playerPosition.y += elementSize;
        starGame();
   }

};

function formatTime(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `${cs}`.padStart(2,"0")
    const segStr = `${seg}`.padStart(2,"0")
    const minStr = `${min}`.padStart(2,"0")
    return`${minStr}:${segStr}:${csStr}`
}