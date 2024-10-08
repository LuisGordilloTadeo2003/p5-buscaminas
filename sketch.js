//Variables globales
let tablero;





function setup() {
  createCanvas(900, 600);//tamaño de la caja
  tablero = new Grid(40,20);
}

function draw() {
  background("white");
  tablero.display()
}


