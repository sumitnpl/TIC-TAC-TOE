const root = document.documentElement;
let toggle = document.querySelector('#toggle-btn');
let mainContainer = document.querySelector('.main-container');
let darkTheme = false;
let resetBtn = document.querySelector('#reset-btn');
let gameBoard = document.querySelector('.board-container');
let gameOver = document.querySelector('.game-over');
let gameResult = document.querySelector('.game-result');
let boxes = document.querySelectorAll('.box');
let trophy = document.querySelector('#trophy');
let msg = document.querySelector('#winner');
let timezoner = document.querySelector('#timehere');
let winnerText = document.querySelector('#winnertext');
let head = document.querySelector('#headin');
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw


let d = new Date();
let hour = d.getHours();
// let hour = 8;
updateTime();
setInterval(updateTime, 1000);
function updateTime(){
  if(hour >= 18 || hour <6){
    // for dark theme
    console.log("dark theme if ")
    root.style.setProperty('--body-color', '#47494b');
    root.style.setProperty('--border-color', '#f8f7fe');
    root.style.setProperty('--hover-color', '#47494bbe');
    root.style.setProperty('--text-color', '#fff');
    toggle.classList.remove('fa-toggle-on');
    toggle.classList.add('fa-toggle-off');
    darkTheme = true;
  }else{
    // for light theme
    darkTheme = false;
    root.style.setProperty('--body-color', '#f8f7fe');
    root.style.setProperty('--border-color', '#47494b');
    root.style.setProperty('--hover-color', '#f8f7febe');
    root.style.setProperty('--text-color', '#000');
    toggle.classList.remove('fa-toggle-off');
    toggle.classList.add('fa-toggle-on');
  }
}



// Theme Toggle
toggle.addEventListener(
  'click',
  () => {
    if (darkTheme) {
      // for light theme
      darkTheme = false;
      hour = 8
      root.style.setProperty('--body-color', '#f8f7fe');
      root.style.setProperty('--border-color', '#47494b');
      root.style.setProperty('--hover-color', '#f8f7febe');
      root.style.setProperty('--text-color', '#000');
      toggle.classList.remove('fa-toggle-off');
      toggle.classList.add('fa-toggle-on');
    } else {
      // for dark theme
      hour= 20
      root.style.setProperty('--body-color', '#47494b');
      root.style.setProperty('--border-color', '#f8f7fe');
      root.style.setProperty('--hover-color', '#47494bbe');
      root.style.setProperty('--text-color', '#fff');
      toggle.classList.remove('fa-toggle-on');
      toggle.classList.add('fa-toggle-off');
      darkTheme = true;
    }
  },
  3000
);

// Reset Game
resetBtn.addEventListener('click', () => {
  turnO = true;
  count = 0;
  stop = 1;
  boxes.forEach((box) => {
    box.innerText = '';
  });
  gameBoard.classList.remove('hide');
  gameOver.classList.add('hide');
  gameResult.classList.add('hide');
});

// Win Patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Game Logic
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.innerText === '') {
      if (turnO) {
        box.innerText = 'O';
        box.style.color = '#84dcc6';
        turnO = false;
      } else {
        box.innerText = 'X';
        box.style.color = ' #ff686b';
        turnO = true;
      }
      count++;
    }
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Check Winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (pos1Val == 'X') {
          msg.style.color = '#ff686b';
          var colors = ['#ff686b', '#ff686b'];
        } else {
          msg.style.color = '#84dcc6';
          var colors = ['#84dcc6', '#84dcc6'];
        }
        msg.innerText = `${pos1Val}`;

        (function frame() {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });
        })();
        gameBoard.classList.add('hide');
        gameResult.classList.remove('hide');
        gameOver.classList.add('hide');
        return true;
      }
    }
  }
};

// Game Draw
const gameDraw = () => {
  console.log('Game was draw');
  gameOver.classList.remove('hide');
  gameBoard.classList.add('hide');
  gameResult.classList.add('hide');
  gameOver.innerText = 'Game was draw';
};

// Get modal elements
const modalContainer = document.getElementById('modal-container');
const modalToggle = document.getElementById('modal-toggle');
const modalClose = document.getElementById('modal-close');

// Function to open modal
function openModal() {
    modalContainer.style.display = 'flex';
    modalContainer.classList.add('active');
}

// Function to close modal
function closeModal() {
    modalContainer.style.display = 'none';
    modalContainer.classList.remove('active'); 
}

// Event listeners
modalClose.addEventListener('click', closeModal);
mainContainer.addEventListener('click', closeModal);

modalToggle.addEventListener('click', function(event) {
  // Prevent the click event from bubbling up to the window
  event.stopPropagation();
  openModal();
});


