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
let elementSize; // Con este código las bombas entran mejor en el canvas.

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

// function starGame(){
    
    // game.font = elementSize + 'px Verdana'; // Le da el tamaño y el estilo al elemento, en este caso 'Verdana' tiene que ir alado de 'px'.
    // game.textAlign = 'right' // Para que comience desde el punto deseado.
    // game.font =  "36px serif";

    
    // const map = maps[1];

    // const mapsRows = map.trim().split('\n'); // La funcion trim( funciona unicamente con 'strings') limpia los elementos de espacios al principio y al final. La funcion split vuelve en este caso elementos a las filas de un array.
   
    // const mapsRowsCols = mapsRows.map(row => row.trim().split('')); // La función map ayuda a crear arreglos a apartir de otros arreglos.
     

    // mapsRowsCols.forEach((row, rowI) => {  // LO que hacemos aque es con el forEach recorrer el array, se hace dos forEach porque son arrays bidimensionales.
    //     row.forEach( (col, colI) =>{
            
    //         const colEmojis = emojis[col]; // Se selecciona los emojis dependiendo el elemento del estring que exista en la columna. EJ/ I = Regalo.
    //         const posX = elementSize * (colI + 1);
    //         const posY = elementSize * (rowI + 1);
    //         game.fillText(colEmojis,posX,posY);
    //         console.log({col,row, rowI, colI}) // Se recorre el array de filas(rows) y el de columnas (cols).
    //     });
    // });
    
// };

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


// FUNCIÓN NUMERO #4

function starGame(){
    
    game.font = elementSize * 0.9 + 'px verdana'; // Le da el tamaño y el estilo al elemento, en este caso 'Verdana' tiene que ir alado de 'px'. El 0.9 lo utilizo para "separar" los iconos, pero lo que hace es disminuir el tamaño de ocupacio nde estos iconos.
    // game.textAlign = 'right' // Para que comience desde el punto deseado.
    
    const map = maps[0];

    const mapsRows = map.trim().split('\n'); // La funcion trim( funciona unicamente con 'strings') limpia los elementos de espacios al principio y al final. La funcion split vuelve en este caso elementos a las filas de un array.
    
    const mapsRowsCols = mapsRows.map(row => row.trim().split('')); // La función map ayuda a crear arreglos a apartir de otros arreglos.
        
    
    for (let row = 0.85; row <= 10; row++) { // EL 10, es el limite de la grilla de 10x10.
        for (let col = 0.05; col < 10; col++) {
            game.fillText(emojis[mapsRowsCols[Math.floor(row)][Math.floor(col)]], elementSize * col, elementSize * row);     // Es necesario coloca el Math.floor para aproximar los numeros a un valor entero, en este caso el menor, y que de esta manera la funcion funcione.
        }    
    } 

};

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
function moveUp(){
    console.log(' Estoy presionando la tecla hacia arriba');
};

function moveLeft(){
    console.log(' Estoy presionando la tecla hacia la izquierda');
};

function moveRight(){
    console.log(' Estoy presionando la tecla hacia la derecha');
};

function moveDown(){
    console.log(' Estoy presionando la tecla hacia abajo');
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
