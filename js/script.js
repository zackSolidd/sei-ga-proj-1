console.log("hello world");

let score = 0;
let gameTime = 20;
let startCounter = 4;
let gameState = 0; //0 press start to play, 1 press restart first then press 1;

let nav = document.querySelector('.nav');
let stopBtn = document.createElement('button');
stopBtn.setAttribute('class','buttonHolder')
stopBtn.textContent = ("Stop");
let startBtn = document.createElement('button');
startBtn.setAttribute('class','buttonHolder')
startBtn.textContent = ("Start");
let restartBtn = document.createElement('button');
restartBtn.setAttribute('class','buttonHolder')
restartBtn.textContent = ("Restart");
let container = document.querySelector('.container');
let scoreBoard = document.createElement('p');
scoreBoard.setAttribute('class','scoreBoard')
scoreBoard.setAttribute('style','display:inline-block');
let countDownTimer = document.createElement('p');
countDownTimer.setAttribute('class','countDownTimer');
countDownTimer.setAttribute('style','display:inline-block');
let blanketText = document.querySelector('.blanket');

scoreBoard.innerHTML = (`Score = ${score}`);
countDownTimer.innerHTML = (`Timer = ${gameTime}`);


nav.appendChild(startBtn);
nav.appendChild(stopBtn);
nav.appendChild(restartBtn);
nav.appendChild(scoreBoard);
nav.appendChild(countDownTimer);

let target = document.querySelectorAll(".target");
//functions 
function changeColor(){
        for (let i = 0 ; i < target.length ; i++) {
            target[i].style.backgroundColor = "white";
        }
        let randomNumber = Math.floor(Math.random()*16+1);
        console.log(randomNumber);
        let box = document.querySelector('.box'+randomNumber);
        box.style.backgroundColor = 'red';
        box.addEventListener('click', function(e) {
            console.log(e.srcElement.className);
            if ( e.srcElement.className == 'box'+randomNumber+' target') {
                score++;
                console.log('score =' + score);
                scoreBoard.innerHTML = (`Score = ${score}`);
                changeColor();
            }
        });
};

var timerInterval;
var startInterval;

function startIntervalCountdown() {
    startCounter--;
    blanketText.innerHTML = (`${startCounter}`);
}

function timerCountDownFunction() {
    gameTime--;
    countDownTimer.innerHTML = (`Timer = ${gameTime}`); 
    if (gameTime === 0) {
        alert(`Times Up !!! \n Your Score is ${score}`);
        clearInterval(timerInterval);
        gameState = 1;
    }
}

function clearStartCountInterval() {
    clearInterval(startInterval);
    document.querySelector('.blanket').style.opacity = "0";
    document.querySelector('.blanket').style.zIndex = "-1";
}

function startCount() {
    document.querySelector('.blanket').style.opacity = "0.8";
    startInterval = setInterval(startIntervalCountdown,1000);
    setTimeout(clearStartCountInterval,3000);
}

// event listener
startBtn.addEventListener('click', function() {
    if (gameState === 0) {
        startCount()
        setTimeout(changeColor,4000);
        timerInterval = setInterval(timerCountDownFunction,1000);
    }
    else {
        alert("Please press Restart")
    }
})

stopBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    gameState = 1;
    document.querySelector('.blanket').style.opacity = "0.8";
    document.querySelector('.blanket').style.zIndex = "1";
    blanketText.innerHTML = (`Stop`);
})

restartBtn.addEventListener('click', function() {
    for (let i = 0 ; i < target.length ; i++) {
        target[i].style.backgroundColor = "white";
    }
    score = 0;
    gameTime = 20;
    scoreBoard.innerHTML = (`Score = 0`);
    countDownTimer.innerHTML = (`Timer = 20`);
    gameState = 0;
    startCounter = 3;
    blanketText.innerHTML = (`${startCounter}`);
    document.querySelector('.blanket').style.zIndex = "1";
    document.querySelector('.blanket').style.opacity = "0";
})






