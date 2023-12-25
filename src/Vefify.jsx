import { SCORE, turn } from "./conts";

function Vefify(table) {
  let win = null;
  let count = 0;

  // Verificando filas iguales
  for (let i = 0; i < 3; i++) {
    if (table[i][0] !== "" && table[i][0] === table[i][1] && table[i][0] === table[i][2]) {
      win = table[i][0];
    }
  }

  // Verificando columnas iguales
  for (let j = 0; j < 3; j++) {
    if (table[0][j] !== "" && table[0][j] === table[1][j] && table[0][j] === table[2][j]) {
      win = table[0][j];
    }
  }

  // Verificando diagonales iguales
  if (table[0][0] !== "" && table[0][0] === table[1][1] && table[0][0] === table[2][2]) {
    win = table[0][0];
  }

  if (table[0][2] !== "" && table[0][2] === table[1][1] && table[0][2] === table[2][0]) {
    win = table[0][2];
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (table[i][j] !== "") {
        count++;
      }
    }
  }

  if (win === null && count === 9) {
    win = SCORE.EMPATE;
  }

  return win;
}

export default Vefify;
