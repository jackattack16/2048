let board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];

function doshit() {
  let startCell1 = randCell(-1, -1).split(".");
  while(board[startCell1[0]-1][startCell1[1]-1] !== 0) {
    startCell1 = randCell(-1, -1).split(".");
  }
  board[startCell1[0]-1][startCell1[1]-1] = startCell1[2];
  updateBoard();
}

function startGame() {
  doshit();
  doshit();
  updateBoard();
}

function updateBoard() {
  clearBoard(false);
  for (let j = 1; j < 5; j++) {
    var parentElement = document.getElementById('row' + j);
    for (var i = 0; i < parentElement.children.length; i++) {
      if (board[j-1][i] !== 0) {
        parentElement.children[i].innerText = board[j-1][i];
      }
    }
}
}
// -1 for rand, row and coll is betwen 1 & 4, inclusive. 
function randCell(row, coll) {
  
  if (row == -1) {
    var rowG = Math.floor(Math.random()*(5 - 1)+1);
  } else {
    var rowG = row;
  }
  
  if (coll == -1) {
    var collG = Math.floor(Math.random()*(5 - 1)+1);
  } else {
    var collG = coll;
  }
  let location = rowG + "." + collG;
  let value = Math.floor(Math.random()*100);
  value = value%2;
  if (value !== 0) {
    value = 2;
  } else {
    value = 4;
  }
  let returnAns = location + "." + value;
  return returnAns;
}

function clearBoard(reset) {
  for (let j = 1; j < 5; j++) {
    var parentElement = document.getElementById('row' + j);
    for (var i = 0; i < parentElement.children.length; i++) {
      parentElement.children[i].innerText = '';
      }
    }
    if (reset) {
    board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];
}
}

function readableBoard() {
  alert(board[0] + "\n" + board[1] + "\n" + board[2] + "\n" + board[3]);
}

function right() {
  // thanks chatGPT for that beutifuil method of doing this step, my og method was horrible! <3 
  for (let row = 0; row < 4; row++) {
    // Filter out non-zero elements
    let rowElements = board[row].filter(element => element !== 0);

    // Add zeros to the left to maintain the original row length
    while (rowElements.length < board[row].length) {
      rowElements.unshift(0);
    }
  
  board[row] = rowElements;
  //merging like terms
  for (let i = board[row].length - 1; i > 0; i--) {
      if (rowElements[i] === rowElements[i - 1]) {
        rowElements[i] *= 2;
        rowElements[i - 1] = 0;
      }
    }

    // Filter out zeros after merging
    rowElements = rowElements.filter(element => element !== 0);

    // Add remaining zeros to the left
    while (rowElements.length < board[row].length) {
      rowElements.unshift(0);
    }

    // Update the row in the board
    board[row] = rowElements;
  }
  updateBoard();
}

function left() {
  for (let row = 0; row < 4; row++) {
  //shift zeros to the right side of the array
  let rowElements = board[row].filter(element => element !== 0);
  while (rowElements.length < board[row].length) {
      rowElements.push(0);
  }
  //updateBoard with new row
  board[row] = rowElements;
  //merge like terms
  for (let i = 0; i < board[row].length - 1; i++) {
      if (rowElements[i] === rowElements[i + 1]) {
        rowElements[i] *= 2;
        rowElements[i + 1] = 0;
      }
    }

    // Filter out zeros after merging
    rowElements = rowElements.filter(element => element !== 0);

    // Add remaining zeros to the right
    while (rowElements.length < board[row].length) {
      rowElements.push(0);
    }

    // Update the row in the board
    board[row] = rowElements;
  }
updateBoard();
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    right();
    doshit();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    left();
    doshit();
  }
});