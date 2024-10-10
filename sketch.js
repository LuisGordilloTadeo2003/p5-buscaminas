//Variables globales
let tablero;

function setup() {
  createCanvas(900, 600);//tamaño de la caja
  tablero = new Grid(40, 20);

  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
}

function draw() {
  background("white");
  tablero.display()
}

function mousePressed() {
  let arrayX = floor(mouseX / tablero.cellSize)
  let arrayY = floor(mouseY / tablero.cellSize)

  if (mouseButton === RIGHT) tablero.celdas[arrayX][arrayY].bandera = true;
  else if (mouseButton == LEFT) tablero.celdas[arrayX][arrayY].descubierta = true;

  if (tablero.celdas[arrayX][arrayY].vecinos == 0) tablero.descubrirCeldas(arrayX, arrayY);
}


