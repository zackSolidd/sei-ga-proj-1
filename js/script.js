console.log("hello world");

let hit = 0;
let miss = 0;
let score = 0;
let gameTime = 10;
let startCounter = 4;
let gameState = 1; //0 press start to play, 1 press restart first then press 1;

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
let hitBoard = document.createElement('p');
hitBoard.setAttribute('class','hitBoard');
let missBoard = document.createElement('p');
missBoard.setAttribute('class','missBoard');
let scoreBoard = document.createElement('p');
scoreBoard.setAttribute('class','scoreBoard');
let countDownTimer = document.createElement('p');
countDownTimer.setAttribute('class','countDownTimer');
let blanketText = document.querySelector('.blanket');
let scoreBoardText = document.querySelector('.endGameScoreboard');

hitBoard.innerHTML = (`Hit = ${hit}`);
missBoard.innerHTML = (`Miss = ${miss}`);
countDownTimer.innerHTML = (`Timer = ${gameTime}`);


nav.appendChild(startBtn);
nav.appendChild(stopBtn);
nav.appendChild(restartBtn);
nav.appendChild(hitBoard);
nav.appendChild(missBoard);
nav.appendChild(countDownTimer);

let target = document.querySelectorAll(".target");
let redBox = null;
let randomNumber = 0;

//functions 

function changeColor(){
    randomNumber = Math.floor(Math.random()*16+1);
    console.log(randomNumber);
    redBox = document.querySelector('.box'+randomNumber);
    redBox.classList.remove('whiteCircle');
    redBox.classList.add('redCircle');
};

for (let i = 1 ; i < 17 ; i++) {
    let box = document.querySelector('.box'+i);
    box.addEventListener('click', function (e) {
    //box.addEventListener('click', function handler(e) {
        //pewSound();
        //e.target.removeEventListener(e.type, handler);
        console.log(e.target.className);
        if (box.classList.contains('redCircle')) {
            hit++;
            score++;
            console.log('Score =' + score);
            hitBoard.innerHTML = (`Hit = ${hit}`);
            redBox.classList.remove('redCircle');
            redBox.classList.add('whiteCircle');
            changeColor();
        }
        else {
            console.log('Wrong button');
            miss++;
            score--;
            missBoard.innerHTML = (`Miss = ${miss}`);
        }
    });
}

var timerInterval;
var startInterval;

function startIntervalCountdown() {
    startCounter--;
    blanketText.innerHTML = (`${startCounter}`);
}

function gameTimeTracker() {
    timerInterval = setInterval(timerCountDownFunction,1000);
}

function timerCountDownFunction() {
    gameTime--;
    countDownTimer.innerHTML = (`Timer = ${gameTime}`); 
    if (gameTime === 0) {
        console.log(`Time is Up !!! \n Your Score is ${score}`);
        clearInterval(timerInterval);
        gameState = 1;
        document.querySelector('.blanket').style.opacity = "0";
        document.querySelector('.blanket').style.zIndex = "-1";
        document.querySelector('.endGameScoreboard').style.opacity = "0.8";
        document.querySelector('.endGameScoreboard').style.zIndex = "1";
        blanketText.innerHTML = (``);
        scoreBoardText.innerHTML = (`Score = ${score}`);
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

// var pewPew = document.getElementById('pewPew');
// function pewSound() {
//     pewPew.play();
// }

var changeColorTimeout;
var gameTimerTrackerTimeout;
// event listener
startBtn.addEventListener('click', function() {
    if (gameState === 0) {
        startCount();
        changeColorTimeout = setTimeout(changeColor,3000);
        gameTimerTrackerTimeout = setTimeout(gameTimeTracker,3000);
    }
    else {
        alert("Please press Restart");
    }
})

stopBtn.addEventListener('click', function() {
    gameState = 1;
    clearInterval(timerInterval);
    clearInterval(startInterval);
    clearTimeout(changeColorTimeout);
    clearTimeout(gameTimerTrackerTimeout);
    document.querySelector('.blanket').style.opacity = "0.8";
    document.querySelector('.blanket').style.zIndex = "1";
    blanketText.innerHTML = (`Stop`);
})

restartBtn.addEventListener('click', function() {
    for (let i = 0 ; i < target.length ; i++) {
        target[i].classList.remove('redCircle');
        target[i].classList.add('whiteCircle');
    }
    clearInterval(timerInterval);
    clearInterval(startInterval);
    clearTimeout(changeColorTimeout);
    clearTimeout(gameTimerTrackerTimeout);
    hit = 0;
    miss = 0;
    score = 0;
    gameTime = 10;
    tempNum = 0;
    hitBoard.innerHTML = (`Hit = 0`);
    missBoard.innerHTML = (`Miss = 0`);
    scoreBoard.innerHTML = (`Score = 0`);
    countDownTimer.innerHTML = (`Timer = 10`);
    gameState = 0;
    startCounter = 3;
    blanketText.innerHTML = (`${startCounter}`);
    document.querySelector('.blanket').style.zIndex = "1";
    document.querySelector('.blanket').style.opacity = "0";
})






