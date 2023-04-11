/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize; // Con este código las bombas entran mejor en el canvas y define el tamaño de los emojis.
let level = 0; // Se  crea esta variable, que es el nivel que comienza desde cero.
let lives = 3; // Se crea esta variable para contabilizar el número vidas.



const playerPosition = { // A pesar de que es la variable se define con const, esta puede ser moficiada cuando se modifican los elementos de un objeto, o se trabaja con un objeto.
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = []; // Esta variable fue const, pero no puede serlo porque se va a cambiar el valor cada vez que se ejecute el juego por un array vacio.

window.addEventListener('load',setCanvasSize); // Se ejecuta cada vez que cargamos el HTML.
window.addEventListener('resize',setCanvasSize); // Evento para modificar el tamaño de nuestro canvas.



function setCanvasSize (){
    
    if(window.innerHeight > window.innerWidth){
     canvasSize = window.innerWidth * 0.8;
    }else{
     canvasSize = window.innerHeight * 0.8;
    }; 

    // No importa la medida del ancho y del alto, la medida siempre va a hacer la misma, por lo que se obtendra un cuadrado.

    canvas.setAttribute('width', canvasSize); // Ancho del canvas.
    canvas.setAttribute('height', canvasSize); // Largo del canvas.

    elementSize = (canvasSize / 10)-1;

    starGame();
};
// FUNCIÓN NUMERO #1

function starGame(){
    
    game.font = elementSize * 0.9 + 'px verdana';// Le da el tamaño y el estilo al elemento, en este caso 'Verdana' tiene que ir alado de 'px'.
    // game.textAlign = 'end' // Para que comience desde el punto deseado.
    // game.font =  "36px serif";

    
    const map = maps[level]; // Dentro de los corchetes se coloca level que ira variando a medida de que se aumente de nivel.

    if(!map){ // Se crea este condicional, para dar a enteder que si despues de hacer coalision con el regalo y no hay mas mapas, se termine el juego, osea juego ganado.
        gameWIn(); // Esta funcion anuncia que el juego se gano.
        return; // Con este se dejar de ejecutar la funcion starGame, debido a que no hay mas niveles.
    };

    const mapsRows = map.trim().split('\n'); // La funcion trim( funciona unicamente con 'strings') limpia los elementos de espacios al principio y al final. La funcion split vuelve en este caso elementos a las filas de un array.
   
    const mapsRowsCols = mapsRows.map(row => row.trim().split('')); // La función map ayuda a crear arreglos a apartir de otros arreglos.
    enemyPositions = []; // Esta se crear para reemplazar los nuevos valores de los objetos enemigos, que se llena siempre que el juego comienza una y otra vez.
    // enemyPositions ahora tiene infomacion de un array y pasa a ubicarse arriba en la variable let con el mismo nombre (let enemyPositions = [];)
    game.clearRect(0,0,canvasSize,canvasSize); // Elimina todo el juego antes de reenderizar, que seria la siguiente funcion. ELIMINA y REENDERIZA. Cuando se llama a la funcion starGame();
    mapsRowsCols.forEach((row, rowI) => {  // LO que hacemos aque es con el forEach recorrer el array, se hace dos forEach porque son arrays bidimensionales.
        row.forEach( (col, colI) =>{
            
            const colEmojis = emojis[col]; // Se selecciona los emojis dependiendo el elemento del string que exista en la columna. EJ/ I = Regalo.
            const posX = elementSize * (colI ); // 1.15
            const posY = elementSize * (rowI + 0.9); // 0.9
            

            if (col == 'O') {
                if(!playerPosition.x &&  !playerPosition.y ){ // Este condicional hará que el jugador se mueva, si la coordenada x y y, tiene valor undefined, entrará como true, pero eso no pasará debido a que la calavera variara de posición.
                    
                    playerPosition.x = posX; // Esta parte se debe modificar, porque al reiniciar el juego, el jugador volveraá a su posicion inicial siempre.
                    playerPosition.y = posY;
                    console.log({playerPosition});
                    console.log({posX,posY});
                };             
              }else if (col == 'I') { // Este condicional valida la posicion del regalo. Cuando 'O' llega a la posicion de 'I', este condicional funciona.
                    giftPosition.x = posX;
                    giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({ // Se ubica la posicion del enemigo, mediante objetos en un array vacio.
                    x: posX,
                    y: posY,
                });
            };

            game.fillText(colEmojis,posX,posY);
            // console.log({col,row, rowI, colI}) // Se recorre el array de filas(rows) y el de columnas (cols).
        });
    });

    movePLayer(); // Cuando se reenderiza el juego, y se juega con el movimiento de la calavera, siempre va a aparecer la calavera con esta funcón.
};

function movePLayer (){ // Función para que aparezca la calavera.
    const giftCoallitionX = giftPosition.x.toFixed(3) == playerPosition.x.toFixed(3); // Deben coincidir tanto en X, como en Y. El regalo no se mueve, por ende sus coordenadas quedaran fijas.
    const giftCoallitionY = giftPosition.y.toFixed(3) == playerPosition.y.toFixed(3);
    const giftCollition = giftCoallitionX && giftCoallitionY; // Se crea esta constante que es el condicional abajo.

    if(giftCollition){ // Si la posicion de de Y para el regalo y el jugador (calavera), y la posicion X para el regalo y el jugador, coinciden, se cumple la COALICIÓN.
        levelWin();
    };

    const enemyCoallition = enemyPositions.find(enemy => { // Función find cuando la bomba y el jugador estan en la misma posición, para luego crear el condicional que tiene a la función, que determinará la coalision.
        const enemyCoallitionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCoallitionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return  enemyCoallitionX && enemyCoallitionY;
    });

    if(enemyCoallition){ // Condicional que activa una función levelFail(), cuando nos estrellamos con una bomba
            levelFail();           
    };
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y)
};

// FUNCIÓN NUMERO #2

// function starGame(){
    
//     game.font = elementSize + 'px Verdana'; // Le da el tamaño y el estilo al elemento, en este caso 'Verdana' tiene que ir alado de 'px'.
//     game.textAlign = 'right' // Para que comience desde el punto deseado.
//     game.font =  "36px serif";

    
//     const map = maps[0];

//     const mapsRows = map.trim().split('\n'); // La funcion trim( funciona unicamente con 'strings') limpia los elementos de espacios al principio y al final. La funcion split vuelve en este caso elementos a las filas de un array.
   
//     const mapsRowsCols = mapsRows.map(row => row.trim().split('')); // La función map ayuda a crear arreglos a apartir de otros arreglos.
     
   
//     for (let row = 1; row <= 10; row++) {
//         for (let col = 1; col <= 10; col++) {
//            game.fillText(emojis[mapsRowsCols[row - 1][col - 1]], elementSize * col +15, elementSize * row-5);    
//         }    
//     } 

    
// };



// FUNCIÓN NUMERO #3

// function starGame(){

//     game.font = elementSize * 0.9 + "px impact";

//     const map = maps[0];
//     console.log(map);
//     const mapsRows = map.trim().split('\n');
//     console.log(mapsRows);
//     const mapsRowsCols = mapsRows.map(row => row.trim().split(''));
//     console.log(mapsRowsCols);
//     console.log(mapsRowsCols.length);

//     // const map = maps[0].trim();
//     // const mapRows = map.split("\n").map((row) => row.trim());


//     for (let row = 0.85; row <= mapsRowsCols.length; row++) {
//         for (let column = 0.05; column < 10; column++) {
//           const emoji = emojis[mapsRowsCols[Math.floor(row)][Math.floor(column)]];
    
//           game.fillText(emoji, elementSize * column, elementSize * row);
//         }
//       }
//     };


// FUNCIÓN NUMERO #4 == 'stanby'



// function starGame(){
    
//     game.font = elementSize * 0.9 + 'px verdana'; // Le da el tamaño y el estilo al elemento, en este caso 'Verdana' tiene que ir alado de 'px'. El 0.9 lo utilizo para "separar" los iconos, pero lo que hace es disminuir el tamaño de ocupacio nde estos iconos.
//     // game.textAlign = 'right' // Para que comience desde el punto deseado.
    
//     const map = maps[0];

//     const mapsRows = map.trim().split('\n'); // La funcion trim( funciona unicamente con 'strings') limpia los elementos de espacios al principio y al final. La funcion split vuelve en este caso elementos a las filas de un array.
    
//     const mapsRowsCols = mapsRows.map(row => row.trim().split('')); // La función map ayuda a crear arreglos a apartir de otros arreglos.
    
    

//     for (let row = 0.85; row <= 10; row++) {// EL 10, es el limite de la grilla de 10x10.   
//         for (let col = 0.05; col < 10; col++) {
           
//         const posX = elementSize * col;
//         const posY = elementSize * row;
//             game.fillText(emojis[mapsRowsCols[Math.floor(row)][Math.floor(col)]], posX, posY);     // Es necesario coloca el Math.floor para aproximar los numeros a un valor entero, en este caso el menor, y que de esta manera la funcion funcione.  
//         }    
//     }
// };



window.addEventListener('keydown',movesKeyBoard);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function movesKeyBoard (event){
    if(event.key =="ArrowUp")moveUp();
    else if (event.key =="ArrowLeft")moveLeft();
    else if (event.key =="ArrowRight")moveRight();
    else if (event.key =="ArrowDown")moveDown();
};

function levelWin(){ // Se crea esta funcion para subir el valor del nivel, cada que se cambia el numero del nivel, vuelve y empieza el juego desde el otro nivel.
    console.log('Pasaste de nivel!!');
    level ++; // Aumentar la variable level arriba, de unidad en unidad.
    starGame(); // Cada que se aumenta de nivel se ejecuta la funcion de empezar el juego.
};

function gameWIn(){ // Se ejecuta cuando se gana el juego, osea cuando no hay mas mapas.
    console.log('Terminaste el Juego');
};

function levelFail(){ // Cuando el jugador se encuentra en la misma posicion de la bomba se crea la siguiente función.
    console.log('Colisionaste: perdiste :(');
    lives--; // Resta la cantidad de vida cada vez que se ejecuta esta función.
    console.log(lives);
    if(lives <= 0){ // Cuando las vidas llegan a cero se ejecuta este condicional, que le otroga al jugador 3 nuevas vidas, pero lo devuelve al nivel 0.
       level = 0;
       lives = 3; 
    };

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    starGame();
};

function moveUp(){ // Funciones para el movimiento de la calavera, en las direcciones deseadas.
   if(playerPosition.y - elementSize < 0){ // Con este condicional se busca teniendo en cuenta las coordenadas, que la calavera salga o no del canvas.
        console.log('OUT'); // Se debe tener en cuenta si suma o resta a la posicion del jugador, lo que se modifica son las coordenadas.
   }else{
        playerPosition.y -= elementSize; // Se modifica la posicion inicial en que se ubica la calavera.
        starGame(); // Colocando esta función, se ejecuta el juego, eliminando, renderizando y moviendo al jugador con movePlayer();
   }
   
    // console.log(' Estoy presionando la tecla hacia arriba');
    
    // movePLayer(); // Una vez se reenderiza el juego, vuelve a aparecer donde se realizo el movimiento.
    
};

function moveLeft(){
    if(playerPosition.x - elementSize < 0){
        console.log('OUT');
   }else{
        playerPosition.x -= elementSize;
        starGame(); 
   }
    
    // console.log(' Estoy presionando la tecla hacia la izquierda');
    
    // movePLayer();
    
};

function moveRight(){
    if(playerPosition.x + elementSize > canvasSize - elementSize){
        console.log('OUT');
   }else{
        playerPosition.x += elementSize;
        starGame(); 
   }
    
    // console.log(' Estoy presionando la tecla hacia la derecha');
    
    // movePLayer();
    
};

function moveDown(){
    if(playerPosition.y + elementSize > canvasSize ){
        console.log('OUT');
   }else{
    playerPosition.y += elementSize;
        starGame(); 
   }
    
    // console.log(' Estoy presionando la tecla hacia abajo');
    
    // movePLayer();
    
};


// Ciclo que permite llenar el canvas de bombas. Se aprecia un ciclo dentro de otro ciclo.
    
    // canvas.setAttribute('width', window.innerWidth * 0.75); // Modifica el valor del ancho del canvas.
    // canvas.setAttribute('height', window.innerHeight * 0.75); //Modifica el valor del alto del canvas.
    
    
    // window.innerHeight
    // window.innerWidth
    
    // game.fillRect(0,50,100,100); // Crea un rectangulo en canvas.
    // game.clearRect(50,0,50,50); // Borra un rectangulo en canvas.

    // game.font = '20px Verdana'; // Da el tamaño y el estilo de letra al texto.
    // game.fillStyle = 'purple'; // Da color al texto.
    // game.fillText('Yeah', 50,50); // Posiciona el texto, en los eje X y Y.
