import { useEffect } from "react";

let table = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function App() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    let ancho = canvas.width;
    let alto = canvas.height;
    let anchoCelda = ancho / 3;
    let altoCelda = alto / 3;
    drawTable(ctx, ancho, alto, anchoCelda, altoCelda);
    drawGame(ctx, anchoCelda, altoCelda);
  }, []);

  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath()
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke()
  }
  const drawTable = (ctx, ancho, alto, anchoCelda, altoCelda) => {
    ctx.lineWidth = 2;
    ctx.clearRect(0,0,ancho,alto);
    ctx.strokeStyle = 'white'
    drawLine(ctx, 0, altoCelda, ancho, altoCelda)
    drawLine(ctx, 0, altoCelda * 2, ancho, altoCelda * 2);
    drawLine(ctx, anchoCelda, 0, anchoCelda, ancho);
    drawLine(ctx, anchoCelda * 2, 0, anchoCelda * 2, ancho);

  };

  const drawX = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
    drawLine(ctx, x1, y1, x2, y2);
    drawLine(ctx, x3, y3, x4, y4);
  }

  const drawO = (ctx, x, y, radio) => {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI*2)
    ctx.stroke()
  }

  const drawGame = (ctx, anchoCelda, altoCelda) => {
    for(let i =0; i<3; i++){
      for(let j=0; j<3; j++){
        let x = anchoCelda * i + anchoCelda / 2;
        let y = altoCelda * j + altoCelda / 2;
        let radio = anchoCelda / 3;
        if(table[i][j] === 'turn.ROBOT'){
          drawX(ctx, x-radio, y-radio, x+radio, y+radio, x+radio, y-radio, x-radio, y+radio)
        }else if(table[i][j] === 'turn.PLAYER'){
          drawO(ctx, x, y, radio)
        }
      }
    }
  }

  return (
    <div>
      <canvas style={{ background: "teal" }} width="400" height="400" />
    </div>
  );
}

export default App;
