const resultId = document.getElementById("result");
const opPlayerId = document.getElementById("player");
const symbolId = document.getElementById("symbol");
const resetId = document.getElementById("reset");
const squareClass = document.querySelectorAll(".square");
const markName = document.getElementsByName("symbol");
const statusId = document.getElementById("status");
const containerId = document.getElementById("container");
let mark;
let opPlayer;

//player object
function Player(mark, no) {
  this.no = no;
  this.mark = mark;
  this.score = 0;
}

let p2;
let p1;
let currentPlayer;
let currentMarker;
let flag;
let winner;
let board = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function score() {
  //showing previous score;
  let name;
  const winner = JSON.parse(localStorage.getItem("winner"));
  if (winner) {
    if (winner.no === 3) {
      name = "Computer";
    } else if (winner.no === 2) {
      name = "Player 2";
    } else {
      name = "Player 1";
    }
    resultId.textContent = `Top Scorer is ${name} with score ${winner.score}`;
  }
}

function storeScore() {
  let winner;
  if (p1.score > p2.score) {
    winner = JSON.stringify(p1);
    localStorage.setItem("winner", winner);
  } else {
    winner = JSON.stringify(p2);
    localStorage.setItem("winner", winner);
  }
}

function setPieces() {
  //selecting symbol
  for (i = 0; i < markName.length; i++) {
    if (markName[i].checked) {
      mark = markName[i].value;
    }
  }
  //selecting player
  opPlayer = Number(opPlayerId.value);
  p1 = new Player(mark, 1);
  if (mark === "X") {
    p2 = new Player("O", opPlayer);
  } else {
    p2 = new Player("X", opPlayer);
  }
}

function checker() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return currentPlayer;
    }

    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return currentPlayer;
    }
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return currentPlayer;
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return currentPlayer;
  }

  return null;
}

function placeMarker(slot, square) {
  let row;
  let col;

  //Converting position given to corresponding index
  if (slot % 3 == 0) {
    row = Math.floor(slot / 3 - 1);
    col = 2;
  } else {
    row = Math.floor(slot / 3);
    col = Math.floor((slot % 3) - 1);
  }
  row = Number(row);
  col = Number(col);
  //Checking weather the place is already fill
  if (board[row][col] != "X" && board[row][col] != "O") {
    board[row][col] = currentMarker;
    square.textContent = currentMarker;
    return true;
  } else {
    return false;
  }
}

function swap() {
  if (currentPlayer != 1) currentPlayer = 1;
  else currentPlayer = p2.no;
  if (currentMarker === "X") currentMarker = "O";
  else currentMarker = "X";
}

// function comInput(square) {
//   //computer input
//   return new Promise((resolve, reject) => {
//     let slot;
//     do {
//       slot = Math.floor(Math.random() * (10 - 1)) + 1;
//     } while (!placeMarker(slot));
//     square.textContent = currentMarker;
//   });
// }

async function startGame() {
  currentMarker = p1.mark;
  currentPlayer = p1.no;
  let i = 0;
  let flag = 1;
  squareClass.forEach(function (square) {
    square.addEventListener("click", function (e) {
      e.preventDefault;
      if (currentPlayer === 3) {
        //computer input if (currentPlayer === 3) {
        let slot;
        do {
          slot = Math.floor(Math.random() * (10 - 1)) + 1;
        } while (!placeMarker(slot, square));
        console.log(slot);
        i++;
        swap();
      }

      let index;
      if (i < 9 && flag === 1) {
        index = square.value;
        placeMarker(index, square);
        i++;
        let winPlayer = checker();
        if (winPlayer != null) {
          if (winPlayer === 1) {
            statusId.textContent = "The first player won the game!";
            p1.score += 10;
            storeScore();
            containerId.style.display = "none";
            flag = 0;
          }

          if (winPlayer == 2) {
            p2.score += 10;
            storeScore();
            statusId.textContent = "The Second player won the game!";
            containerId.style.display = "none";
            flag = 0;
          }
          if (winPlayer === 3) {
            p2.score += 10;
            storeScore();
            statusId.textContent = "The Computer won the game!";
            containerId.style.display = "none";
            flag = 0;
          }
        }
        if (i === 9) {
          statusId.textContent = "Tie";
          flag = 0;
        }
        swap();
      }
    });
  });
}

score();
function start() {
  document.getElementById("restart").style.display = "inline";
  resultId.style.display = "none";
  document.querySelector("form").style.display = "none";
  document.querySelector("#submit").style.display = "none";
  containerId.style.display = "block";
  setPieces();
  startGame();
}

function restart() {
  containerId.style.display = "block";
  statusId.textContent = "";
  board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  squareClass.forEach(function (square) {
    square.textContent = "";
  });
  startGame();
}
