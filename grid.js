class Grid{
    constructor(ancho = 40, alto = 20, cellsize = 20){

        this.ancho = ancho;
        this.alto = alto;
        this.cellSize = cellsize;

        this.celdas = new Array(ancho);
        for(let i = 0; i <this.ancho; i++){
            this.celdas[i] = new Array(alto);
        }
        this.reset();
        this.colocaBombas(10);
     
    }
    colocaBombas(cantidad = 10){
        let contador = 0;
       do {
            let bombax = floor(random(this.ancho))
            let bombay = floor(random(this.alto))
            if(!this.celdas[bombax][bombay].bomba){
                this.celdas[bombax][bombay].bomba = true;
                contador++
            }
        
       } while (contador < cantidad);
    }

    reset(){
        for(let i = 0; i < this.ancho; i++){
            for (let j = 0; j < this.alto; j++) {
                this.celdas[i][j] = {
                    bomba:false,
                    bandera:false,
                    descubierta:false,
                    vecinos:0,
                }
            }
        }
    }

    display(){
        let mx = floor((mouseX)/this.cellSize)
        let my = floor(mouseY/this.cellSize)
       
       
        for(let x = 0; x < this.ancho; x++){
          for(let y = 0; y < this.alto; y++){
           
            if(x == mx & y == my){
      
              fill("orange")
            }else if(this.celdas[x][y].bomba){
                fill("red")
            }else{
      
              fill("lightblue")
            }
            rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
            if(this.celdas[x][y].bomba){
                text('💣', x * this.cellSize + 4, y * this.cellSize + 12)
            }
          }
        }
    }
    
   
}