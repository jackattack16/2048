let board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];
const numToColour = {
  0: ["#ffffff", "225%", "white"],
  2: ["#a5e8d3", "225%", "black"],
  4: ["#63c2a4", "225%", "black"],
  8: ["#63c2c2", "225%", "black"],
  16: ["#4bc4c4", "225%", "black"],
  32: ["#32abad", "225%", "black"],
  64: ["#368ac2", "225%", "black"],
  128: ["#2376ad", "225%", "black"],
  256: ["#173dad", "225%", "black"],
  512: ["#0f1fa6", "225%", "black"],
  1024: ["#3c0fa6", "175%", "black"],
  2048: ["#580fa6", "175%", "black"],
  4096: ["#6f30b3", "175%", "black"],
  8192: ["#8530b3", "175%", "black"],
  16384: ["#a230b3", "125%", "black"],
  32768: ["#c920b0", "125%", "black"],
  65536: ["#ff006f", "125%", "black"],
};
let score = 0;
let highScore = localStorage.getItem('highScore');
let startX;
  let startY;

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
  updateScore();
}

function updateBoard() {
  clearBoard(false);
  for (let j = 1; j < 5; j++) {
    var parentElement = document.getElementById('row' + j);
    for (var i = 0; i < parentElement.children.length; i++) {
      parentElement.children[i].style.background = "#ffffff";
        parentElement.children[i].innerText = board[j-1][i];
        parentElement.children[i].style.background = numToColour[board[j-1][i]][0];
        parentElement.children[i].style.fontSize = numToColour[board[j-1][i]][1];
        parentElement.children[i].style.color = numToColour[board[j-1][i]][2];
        
      }
      }
updateScore();
}

function updateScore() {
  if (highScore < score) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
  document.getElementById('score').innerText = "Score: " + score;
  document.getElementById('highScore').innerText = "Best: " + highScore;
}

function rlyBigNum(num) {
  let destructNum = num;
  let count = 1;
  while (destructNum !== 2048) {
    count++;
    destructNum = destructNum/2;
  }
  alert(changeHue("#580fa6", count*10));
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
  for (let i = rowElements.length - 1; i > 0; i--) {
      if (rowElements[i] === rowElements[i - 1]) {
        score += rowElements[i]*2;
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
  
  
  for (let i = 0; i < board[row].length - 1; i++) {
      if (rowElements[i] === rowElements[i + 1]) {
        score += rowElements[i]*2;
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

function up() {
  for (let coll = 0; coll < 4; coll++) {
    let currColl = [];
    for (let row = 0; row < 4; row++) {
      currColl.push(board[row][coll]);
    }
    
    let rowElements = currColl.filter(element => element !== 0);
    while (rowElements.length < currColl.length) {
      rowElements.push(0);
  }
  currColl = rowElements;
  for (let i = 0; i < currColl.length - 1; i++) {
      if (rowElements[i] === rowElements[i + 1]) {
        score += rowElements[i]*2;
        rowElements[i] *= 2;
        rowElements[i + 1] = 0;
      }
    }
    
    rowElements = rowElements.filter(element => element !== 0);
    while (rowElements.length < currColl.length) {
      rowElements.push(0);
}
    for (let row = 0; row < 4; row++) {
      board[row][coll] = rowElements[row];
    }
}
updateBoard();
}

function down() {
  for (let coll = 0; coll < 4; coll++) {
    let currColl = [];
    for (let row = 0; row < 4; row++) {
      currColl.push(board[row][coll]);
    }
    
    let rowElements = currColl.filter(element => element !== 0);
    while (rowElements.length < currColl.length) {
      rowElements.unshift(0);
  }
 
  for (let i = currColl.length - 1; i > 0; i--) {
      if (rowElements[i] === rowElements[i - 1]) {
        score += rowElements[i]*2;
        rowElements[i] *= 2;
        rowElements[i - 1] = 0;
      }
    }
    
    rowElements = rowElements.filter(element => element !== 0);
    while (rowElements.length < currColl.length) {
      rowElements.unshift(0);
  }
  for (let row = 0; row < 4; row++) {
      board[row][coll] = rowElements[row];
    }
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
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    up();
    doshit();
  }
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowDown') {
    down();
  }
});


//from https://stackoverflow.com/questions/17433015/change-the-hue-of-a-rgb-color-in-javascript

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}


//thx chatGPT for this codes

  document.getElementById('swipe-area').addEventListener('touchstart', (e) => {
    alert(6);
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.getElementById('swipe-area').addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        alert('Swiped right!');
      } else {
        alert('Swiped left!');
      }
    } else {
      if (deltaY > 0) {
        alert('Swiped down!');
      } else {
        alert('Swiped up!');
      }
    }
  });