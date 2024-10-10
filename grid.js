class Grid {
    constructor(ancho = 40, alto = 20, cellsize = 20) {

        this.ancho = ancho;
        this.alto = alto;
        this.cellSize = cellsize;

        this.celdas = new Array(ancho);
        for (let i = 0; i < this.ancho; i++) {
            this.celdas[i] = new Array(alto);
        }
        this.reset();
        this.colocaBombas(100);
        this.calculaVecinos();
    }

    descubrirCeldas(x, y) {
        // Primero desvelamos todas las celdas alrededor de la celda actual (sin recursión aún)
        let celdasConCeroVecinos = [];

        for (let dx = x - 1; dx <= x + 1; dx++) {
            for (let dy = y - 1; dy <= y + 1; dy++) {
                // Evitar la celda central (x, y)
                if (!(dx === 0 && dy === 0)) {

                    // Si la nueva posición está dentro de los límites y no ha sido descubierta
                    if (this.isSafe(dx, dy) && !this.celdas[dx][dy].descubierta) {
                        // Desvelar la celda
                        this.celdas[dx][dy].descubierta = true;

                        // Si la celda descubierta tiene 0 vecinos, la guardamos para procesarla después
                        if (this.celdas[dx][dy].vecinos === 0) {
                            celdasConCeroVecinos.push([dx, dy]);
                        }
                    }
                }
            }
        }

        // Una vez desveladas todas las celdas alrededor, procesamos las que tienen 0 vecinos
        for (let [dx, dy] of celdasConCeroVecinos) {
            this.descubrirCeldas(dx, dy);  // Aquí hacemos la recursión
        }
    }

    isSafe(x, y) {
        return (x >= 0 && x < this.ancho && y >= 0 && y < this.alto)
    }

    calculaVecinos() {
        for (let i = 0; i < this.ancho; i++) {
            for (let j = 0; j < this.alto; j++) {
                if (this.celdas[i][j].bomba) {
                    for (let x = i - 1; x <= i + 1; x++) {
                        for (let y = j - 1; y <= j + 1; y++) {
                            if (this.isSafe(x, y)) {
                                this.celdas[x][y].vecinos++;
                            }
                        }
                    }
                }
            }
        }
    }

    colocaBombas(cantidad) {
        let contador = 0;
        do {
            let bombax = floor(random(this.ancho))
            let bombay = floor(random(this.alto))
            if (!this.celdas[bombax][bombay].bomba) {
                this.celdas[bombax][bombay].bomba = true;
                contador++
            }
        } while (contador < cantidad);
    }

    reset() {
        for (let i = 0; i < this.ancho; i++) {
            for (let j = 0; j < this.alto; j++) {
                this.celdas[i][j] = {
                    bomba: false,
                    bandera: false,
                    descubierta: false,
                    vecinos: 0,
                }
            }
        }
    }

    display() {
        let mx = floor(mouseX / this.cellSize)
        let my = floor(mouseY / this.cellSize)

        for (let x = 0; x < this.ancho; x++) {
            for (let y = 0; y < this.alto; y++) {
                if (x == mx & y == my) {
                    fill("black")
                } else {
                    fill("#ACAEAE")
                }
                rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)

                if (this.celdas[x][y].bandera) {
                    textSize(this.cellSize - 2)
                    text('🚩', x * this.cellSize - 1, y * this.cellSize + 16)
                }

                if (this.celdas[x][y].descubierta) {
                    fill("#D0D1D1")
                    rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
                    if (this.celdas[x][y].bomba) {
                        textSize(this.cellSize - 2)
                        text('💣', x * this.cellSize - 1, y * this.cellSize + 16)
                    } else {
                        if (this.celdas[x][y].vecinos != 0) {
                            switch (this.celdas[x][y].vecinos) {
                                case 1:
                                    fill("green")
                                    break;
                                case 2:
                                    fill("blue");
                                    break;
                                case 3:
                                    fill("red");
                                    break;
                                case 4:
                                    fill("purple");
                                    break;
                                case 5:
                                    fill("darkred");
                                    break;
                                case 6:
                                    fill("darkgreen");
                                    break;
                                default:
                                    fill("black");
                                    break;
                            }
                            textSize(this.cellSize - 4)
                            textStyle("bold")
                            text(this.celdas[x][y].vecinos, x * this.cellSize + 6, y * this.cellSize + 17)
                        }
                    }
                }
            }
        }
    }
}