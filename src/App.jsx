import { useEffect } from "react";

function App() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    let ancho = canvas.width;
    let alto = canvas.height;
    let anchoCelda = ancho / 3;
    let altoCelda = alto / 3;
    drawTable(ctx, ancho, alto, anchoCelda, altoCelda);
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
  return (
    <div>
      <canvas style={{ background: "teal" }} width="400" height="400" />
    </div>
  );
}

export default App;
