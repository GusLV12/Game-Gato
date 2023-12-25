import Verify from "./Vefify";
import { SCORE, turn } from "./conts";

function Minimax(table, profundidad, esMax) {
  let resultado = Verify(table);
  if (resultado !== null) {
    let puntaje = resultado === turn.ROBOT ? SCORE.X : resultado === turn.PLAYER ? SCORE.O : SCORE.EMPATE;
    return puntaje;
  }

  let mejorResultado = esMax ? -Infinity : Infinity;
  let jugador = esMax ? turn.ROBOT : turn.PLAYER;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (table[i][j] === '') {
        table[i][j] = jugador;
        let resultadoMinMax = Minimax(table, profundidad + 1, !esMax);
        table[i][j] = '';
        mejorResultado = esMax ? Math.max(mejorResultado, resultadoMinMax) : Math.min(mejorResultado, resultadoMinMax);
      }
    }
  }

  return mejorResultado;
}

export default Minimax;
