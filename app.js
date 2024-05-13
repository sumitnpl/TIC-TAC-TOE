let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#res-btn");
let game = document.querySelector(".game-container")
let msgContainer = document.querySelector(".msg-container");
let trophy = document.querySelector("#trophy")
let msg = document.querySelector("#msg");
let toggle = document.querySelector("#togglebutton")
let timezoner = document.querySelector("#timehere")
let winnerText = document.querySelector("#winnertext")
const body = document.body;
let isBlack = true;
let head = document.querySelector("#headin")
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw


const d = new Date();
var hour = d.getHours();

// Function to update the time
updateTime();
setInterval(updateTime, 1000);
function updateTime() {
  const d = new Date();
  document.getElementById("timehere").innerHTML = d.toLocaleTimeString();
 if (hour >= 18 || hour < 6){
  // for dark
  isBlack = true;
  body.style.background = " #333537";
  timezoner.style.color = "#c0db6c"
  resetBtn.style.color = "#C2CCCE";
  head.style.color = "#C2CCCE";
  toggle.classList.add("fa", "fa-toggle-off");
  toggle.style.color = "#C2CCCE";
  boxes.forEach(box => {
   box.classList.add("toggle")
    })
}else{
  body.style.background = "#f8f7fe";
    head.style.color = "#333537";
    timezoner.style.color = "#262726"
    resetBtn.style.color = "#C2CCCE";
    isBlack = false;
    toggle.classList.add("fa", "fa-toggle-on");
    toggle.style.color = "#C2CCCE";
    boxes.forEach(box => {
      box.classList.remove("toggle")
    });
}
}
// toggle clicked code
toggle.addEventListener("click", () => {
  // for dark
  if (!isBlack) {
    isBlack = true;
    hour = 20 ; 
    toggle.classList.remove("fa", "fa-toggle-on");
    toggle.classList.add("fa", "fa-toggle-off");
    toggle.style.color = "#C2CCCE";
    body.style.background = "#333537";
    head.style.color = "white";
    boxes.forEach(box => {
      box.classList.add("toggle")
    });
  } else {
    // for day
    body.style.background = "#f8f7fe";
    head.style.color = "black";
    isBlack = false;
    toggle.classList.remove("fa", "fa-toggle-off");
    toggle.classList.add("fa", "fa-toggle-on");
    toggle.style.color = "#C2CCCE";
    hour = 8;
    boxes.forEach(box => {
      box.classList.remove("toggle")
    });
  }
},3000);

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

boxes.forEach((box) => {
  box.addEventListener("click",() => {
    if (box.innerText === "") { 
      if (turnO) {
        box.innerText = "O";
        box.style.color = "#84dcc6";
        turnO = false;
      } else {
        box.innerText = "X";
        box.style.color = " #ff686b";
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


const checkWinner = () => {
  for (let pattern of winPatterns) {
    //console.log(pattern[0],pattern[1], pattern[2]);   (print win pattern)
     // console.log(boxes[pattern[0]].innerText ,boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
      
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if(pos1Val == "X"){
          msg.style.color= "#ff686b";
          var colors = ['#ff686b', '#ff686b'];
        }else{
          msg.style.color ="#84dcc6";
          var colors = ['#84dcc6', '#84dcc6'];
        }
        msg.innerText = `${pos1Val}`;
        var end = Date.now() + (1 * 500);

// go Buckeyes!
// var colors = ['#bb0000', '#ffffff'];

(function frame() {
  confetti({
    particleCount: 6,
    angle: 60,
    spread: 55,
    origin: { x: 0},
    colors: colors
  });
  confetti({
    particleCount: 6,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
          trophy.style.display = "flex";

         msgContainer.classList.remove("hide");
         game.classList.add("gone");
        return true;
      }
    }
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  stop = 1;
  boxes.forEach((box)=>{
    box.innerText = "";
  });
  msgContainer.classList.add("hide");
  game.classList.remove("gone");
};

const gameDraw = () => {
  msg.innerText = `Game was draw`;
  msg.style.fontSize = "4rem";
  msg.style.marginTop = "4.6rem"
  msg.style.fontFamily = "Mochiy Pop One";
  msg.style.textTransform = "none"
  winnerText.style.display = "none"
  msgContainer.classList.remove("hide");
  game.classList.add("gone");
  trophy.style.display = "none";
};

resetBtn.addEventListener("click", resetGame);


