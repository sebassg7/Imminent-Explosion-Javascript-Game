/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load',starGame);
window.addEventListener('resize',starGame);

function starGame(){
   let canvasSize;

   if(window.innerHeight > window.innerWidth){
    canvasSize = window.innerWidth * 0.8;
   }else{
    canvasSize = window.innerHeight * 0.8;
   }; // No importa la medida del ancho y del alto, la medida siempre va a hacer la misma, por lo que se obtendra un cuadrado.

    canvas.setAttribute('width', canvasSize); // Ancho del canvas.
    canvas.setAttribute('height', canvasSize); // Largo del canvas.

    const elementSize = (canvasSize / 10) -1; // Con este código las bombas entran mejor en el canvas.

    // console.log({canvasSize, elementSize});

    
    game.font = elementSize + 'px Verdana'; // Le da el tamaño y el estilo al elemento, en este caso 'Verdana' tiene que ir alado de 'px'.
    game.textAlign = 'start' // Para que comience desde el punto deseado.

    for (let i = 0; i < 10; i++) {
        for (let z = 1; z < 11; z++) {
           game.fillText(emojis['X'],elementSize * i,elementSize * z);    
        }    
    } // Ciclo que permite llenar el canvas de bombas. Se aprecia un ciclo dentro de otro ciclo.
    




    
    // canvas.setAttribute('width', window.innerWidth * 0.75); // Modifica el valor del ancho del canvas.
    // canvas.setAttribute('height', window.innerHeight * 0.75); //Modifica el valor del alto del canvas.
    
    
    // window.innerHeight
    // window.innerWidth
    
    // game.fillRect(0,50,100,100); // Crea un rectangulo en canvas.
    // game.clearRect(50,0,50,50); // Borra un rectangulo en canvas.

    // game.font = '20px Verdana'; // Da el tamaño y el estilo de letra al texto.
    // game.fillStyle = 'purple'; // Da color al texto.
    // game.fillText('Yeah', 50,50); // Posiciona el texto, en los eje X y Y.
};