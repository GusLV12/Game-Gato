import { useEffect, useState } from "react";
import Vefify from "./Vefify";
import Minimax from "./MInimax";

let table = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function App() {
  const [turn, setTurn] = useState("PLAYER");
  const [gano, setGano] = useState("");

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

  useEffect(() => {
    if (turn === "ROBOT") {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      let ancho = canvas.width;
      let alto = canvas.height;
      let anchoCelda = ancho / 3;
      let altoCelda = alto / 3;
  
      eventTurnRobot(ctx, anchoCelda, altoCelda);
      verificadorGanador(); // Corregir aquí
    }
  }, [turn]);
  
  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const drawTable = (ctx, ancho, alto, anchoCelda, altoCelda) => {
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, ancho, alto);
    ctx.strokeStyle = "white";
    drawLine(ctx, 0, altoCelda, ancho, altoCelda);
    drawLine(ctx, 0, altoCelda * 2, ancho, altoCelda * 2);
    drawLine(ctx, anchoCelda, 0, anchoCelda, ancho);
    drawLine(ctx, anchoCelda * 2, 0, anchoCelda * 2, ancho);
  };

  const drawX = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
    drawLine(ctx, x1, y1, x2, y2);
    drawLine(ctx, x3, y3, x4, y4);
  };

  const drawO = (ctx, x, y, radio) => {
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.stroke();
  };

  const drawGame = (ctx, anchoCelda, altoCelda) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = anchoCelda * i + anchoCelda / 2;
        let y = altoCelda * j + altoCelda / 2;
        let radio = anchoCelda / 3;
        if (table[i][j] === "ROBOT") {
          drawX(
            ctx,
            x - radio,
            y - radio,
            x + radio,
            y + radio,
            x + radio,
            y - radio,
            x - radio,
            y + radio
          );
        } else if (table[i][j] === "PLAYER") {
          drawO(ctx, x, y, radio);
        }
      }
    }
  };

  const eventTurnRobot = (ctx, anchoCelda, altoCelda) => {
    if (turn === "ROBOT") {
      let mejorPuntaje = -Infinity;
      let mov = { i: -1, j: -1 };
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (table[i][j] === "") {
            table[i][j] = 'ROBOT';
            let puntaje = Minimax(table, 0, false);
            table[i][j] = 'NOTHING';
            if (puntaje > mejorPuntaje) {
              mejorPuntaje = puntaje;
              mov = { i, j };
            }
          }
        }
      }
  
      if (mov.i !== -1 && mov.j !== -1) {
        table[mov.i][mov.j] = "ROBOT";
        drawGame(ctx, anchoCelda, altoCelda);
        setTurn("PLAYER");
        verificadorGanador();
      }
    }
  };

  const eventDrawTable = (e) => {
    if (turn === "PLAYER") {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      let ancho = canvas.width;
      let alto = canvas.height;
      let anchoCelda = ancho / 3;
      let altoCelda = alto / 3;
      const mouseX = e.clientX - canvas.getBoundingClientRect().left;
      const mouseY = e.clientY - canvas.getBoundingClientRect().top;

      let i = Math.floor(mouseX / anchoCelda);
      let j = Math.floor(mouseY / altoCelda);

      if (table[i][j] === "") {
        table[i][j] = "PLAYER";
        drawGame(ctx, anchoCelda, altoCelda);
        verificadorGanador()
        setTurn("ROBOT");
        
      }
    }
  };

  const verificadorGanador = () => {
    let win = Vefify(table);
    if (win !== null) {
      if (win === "ROBOT") {
        setGano("Te gano la maquina!!!");
      } else if (win === "PLAYER") {
        setGano("Ganaste!!!");
      } else {
        setGano("EMPATE");
      }
      setTurn("NOTHING");
    } else {
      // Verificar empate solo si no hay ganadores y todas las celdas están llenas
      let todasCeldasLlenas = table.every(row => row.every(cell => cell !== ''));
      if (todasCeldasLlenas) {
        setGano("EMPATE");
        setTurn("NOTHING");
      }
    }
  };

  const eventReiniciarJuego = () => {
    table = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d');
    let ancho = canvas.width
    let alto = canvas.height
    let anchoCelda = ancho / 3
    let altoCelda = alto / 3
    drawTable(ctx, ancho,alto,anchoCelda,altoCelda)
    drawGame(ctx,anchoCelda,altoCelda)
    setTurn("ROBOT")
    setGano('');
  }
  
  return (
    <div>
      <canvas
        style={{ background: "teal" }}
        width="400"
        height="400"
        onClick={eventDrawTable}
      />
      <br />
      <span style={{ fontSize: 20 }}>{gano}</span>
      <br />
      <button onClick={eventReiniciarJuego}>Reiniciar</button>
    </div>
  );
}

export default App
