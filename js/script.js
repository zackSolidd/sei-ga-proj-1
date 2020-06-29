console.log("hello world");

let score = 0;
let gameTime = 20;
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
let scoreBoard = document.createElement('p');
scoreBoard.setAttribute('class','scoreBoard')
let countDownTimer = document.createElement('p');
countDownTimer.setAttribute('class','countDownTimer');
let blanketText = document.querySelector('.blanket');

scoreBoard.innerHTML = (`Score = ${score}`);
countDownTimer.innerHTML = (`Timer = ${gameTime}`);


nav.appendChild(startBtn);
nav.appendChild(stopBtn);
nav.appendChild(restartBtn);
nav.appendChild(scoreBoard);
nav.appendChild(countDownTimer);

let target = document.querySelectorAll(".target");
var tempNum = 0;

//functions 

function changeColor(){
        let randomNumber = Math.floor(Math.random()*16+1);
        if (tempNum === randomNumber) {
            console.log('SAME NUMBER');
            changeColor();
        }
        else {
            tempNum = randomNumber;
            console.log(randomNumber);
            let box = document.querySelector('.box'+randomNumber);
            box.style.backgroundColor = 'red';
            box.addEventListener('click', function handler(e) {
                // pewSound();
                e.currentTarget.removeEventListener(e.type, handler);
                console.log(e.srcElement.className);
                if ( e.srcElement.className == 'box'+randomNumber+' target') {
                    score++;
                    console.log('score =' + score);
                    scoreBoard.innerHTML = (`Score = ${score}`);
                    box.style.backgroundColor = 'white';
                    changeColor();
                }
            });
        }
};

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
        document.querySelector('.blanket').style.opacity = "0.8";
        document.querySelector('.blanket').style.zIndex = "1";
        blanketText.innerHTML = (``);
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
    clearInterval(timerInterval);
    gameState = 1;
    clearInterval(startInterval);
    clearTimeout(changeColorTimeout);
    clearTimeout(gameTimerTrackerTimeout);
    document.querySelector('.blanket').style.opacity = "0.8";
    document.querySelector('.blanket').style.zIndex = "1";
    blanketText.innerHTML = (`Stop`);
})

restartBtn.addEventListener('click', function() {
    for (let i = 0 ; i < target.length ; i++) {
        target[i].style.backgroundColor = "white";
    }
    clearInterval(timerInterval);
    clearInterval(startInterval);
    clearTimeout(changeColorTimeout);
    clearTimeout(gameTimerTrackerTimeout);
    score = 0;
    gameTime = 20;
    tempNum = 0;
    scoreBoard.innerHTML = (`Score = 0`);
    countDownTimer.innerHTML = (`Timer = 20`);
    gameState = 0;
    startCounter = 3;
    blanketText.innerHTML = (`${startCounter}`);
    document.querySelector('.blanket').style.zIndex = "1";
    document.querySelector('.blanket').style.opacity = "0";
})






