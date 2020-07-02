console.log("hello world");

let hit = 0;
let miss = 0;
let score = 0;
let gameTime = 20;
let startCounter = 3;
let gameState = 0; //0 press start to play, 1 press restart first then press 1;
let sound = 1;

let nav = document.querySelector('.nav');
let navRight = document.querySelector('.navRight');
let stopBtn = document.createElement('button');
stopBtn.setAttribute('class','buttonHolder')
stopBtn.textContent = ("Stop");
let startBtn = document.createElement('button');
startBtn.setAttribute('class','buttonHolder')
startBtn.textContent = ("Start");
let restartBtn = document.createElement('button');
restartBtn.setAttribute('class','buttonHolder');
restartBtn.textContent = ("Restart");
let friendlyBtn = document.createElement('button');
friendlyBtn.setAttribute('class','buttonHolder');
friendlyBtn.textContent = ('Friendly Off');
let soundBtn = document.createElement('button');
soundBtn.setAttribute('class','buttonHolder');
soundBtn.textContent = ('Sound On');
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
let fpsLogo = document.createElement('img');
fpsLogo.setAttribute('src','fpslab.png');

hitBoard.innerHTML = (`Hit = ${hit}`);
missBoard.innerHTML = (`Miss = ${miss}`);
countDownTimer.innerHTML = (`Timer = ${gameTime}`);
blanketText.innerHTML = ('Please Press <br> Start');

nav.appendChild(startBtn);
nav.appendChild(stopBtn);
nav.appendChild(restartBtn);
nav.appendChild(friendlyBtn);
nav.appendChild(soundBtn);
navRight.appendChild(hitBoard);
navRight.appendChild(missBoard);
navRight.appendChild(countDownTimer);
blanketText.appendChild(fpsLogo);


let target = document.querySelectorAll(".target");
let redBox = null;
let greenBox = null;
let randomNumber = 0;
let randomNumberFriendly = 0;
let friendlyUnitToggle = 0;

//functions 

function friendlyUnit(){
    randomNumberFriendly = Math.floor(Math.random()*16+1); 
    console.log("friendly = " + randomNumberFriendly);
    greenBox = document.querySelector('.box'+randomNumberFriendly);
    if (greenBox.classList.contains('redCircle')) {
        friendlyUnit();
    }
    else {
        greenBox.classList.remove('whiteCircle');
        greenBox.classList.add('greenCircle');
        setTimeout(function() {
            greenBox.classList.remove('greenCircle');
            greenBox.classList.add('whiteCircle');  
        },2000);
    }  
}

function changeColor(){
    randomNumber = Math.floor(Math.random()*16+1);
    console.log(randomNumber);
    redBox = document.querySelector('.box'+randomNumber);
    if (redBox.classList.contains('greenCircle')) {
        changeColor();
    }
    else {
        redBox.classList.remove('whiteCircle');
        redBox.classList.add('redCircle');
    }
};

for (let i = 1 ; i < 17 ; i++) {
    let box = document.querySelector('.box'+i);
    box.addEventListener('click', function (e) {
        pewSound();
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
        else if (box.classList.contains('greenCircle')) {
            console.log(`YOU KILL A FRIENDLY`);
            clearInterval(timerInterval);
            clearTimeout(friendlyTimer);
            gameState = 1;
            document.querySelector('.blanket').style.opacity = "0";
            document.querySelector('.blanket').style.zIndex = "-1";
            scoreBoardText.style.opacity = "0.8";
            scoreBoardText.style.zIndex = "1";
            blanketText.innerHTML = (``);
            scoreBoardText.innerHTML = ('YOU LOSE');
            scoreBoardText.appendChild(fpsLogo);
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

function startCount() {
    document.querySelector('.blanket').style.opacity = "0.8";
    startInterval = setInterval(startIntervalCountdown,1000);
    setTimeout(clearStartCountInterval,3500);
}

function startIntervalCountdown() {
    blanketText.innerHTML = (`${startCounter}`);
    console.log(startCounter);
    startCounter--;
}

function clearStartCountInterval() {
    clearInterval(startInterval);
    document.querySelector('.blanket').style.opacity = "0";
    document.querySelector('.blanket').style.zIndex = "-1";
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
        clearTimeout(friendlyTimer);
        gameState = 1;
        document.querySelector('.blanket').style.opacity = "0";
        document.querySelector('.blanket').style.zIndex = "-1";
        scoreBoardText.style.opacity = "0.8";
        scoreBoardText.style.zIndex = "1";
        blanketText.innerHTML = (``);
        scoreBoardText.innerHTML = ('Hits :' + hit + '<br> Misses :' + miss + '<br> Total Score :' + score);
        scoreBoardText.appendChild(fpsLogo);
    }
}



var pewPew = document.getElementById('pewPew');
function pewSound() {
    pewPew.volume = 0.7;
    pewPew.play();
}

var changeColorTimeout;
var gameTimerTrackerTimeout;
var friendlyTimer;

function friendlyTimerInterval() {
   friendlyTimer = setInterval(friendlyUnit,5000)
}

// event listener
startBtn.addEventListener('click', function() {
    if (gameState === 0) {
        startCount();
        changeColorTimeout = setTimeout(changeColor,4000);
        gameTimerTrackerTimeout = setTimeout(gameTimeTracker,4000);
        if (friendlyUnitToggle === 1) {
            setTimeout(friendlyTimerInterval,2000);
        }
        startBtn.disabled = true;
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
    clearTimeout(friendlyTimer);
    document.querySelector('.blanket').style.opacity = "0.8";
    document.querySelector('.blanket').style.zIndex = "1";
    scoreBoardText.style.zIndex = "-2";
    scoreBoardText.style.opacity = "0";
    blanketText.innerHTML = (`Stop`);
    blanketText.appendChild(fpsLogo);
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
    clearTimeout(friendlyTimer);
    startBtn.disabled = false;
    hit = 0;
    miss = 0;
    score = 0;
    gameTime = 20;
    hitBoard.innerHTML = (`Hit = 0`);
    missBoard.innerHTML = (`Miss = 0`);
    scoreBoard.innerHTML = (`Score = 0`);
    countDownTimer.innerHTML = (`Timer = 20`);
    gameState = 0;
    startCounter = 3;
    blanketText.innerHTML = ('Please Press <br> Start');
    blanketText.appendChild(fpsLogo);
    document.querySelector('.blanket').style.zIndex = "1";
    document.querySelector('.blanket').style.opacity = "0.8";
    scoreBoardText.style.zIndex = "-2";
    scoreBoardText.style.opacity = "0";
})

friendlyBtn.addEventListener('click',function() {
    if (friendlyUnitToggle === 0 ) {
        friendlyUnitToggle = 1;
        friendlyBtn.textContent = 'Friendly On';
    }
    else if (friendlyUnitToggle === 1 ) {
        friendlyUnitToggle = 0;
        friendlyBtn.textContent = 'Friendly Off';
    }
    else {
        console.log(`Friendly Button error`);
    }
})

soundBtn.addEventListener('click',function() {
    if (sound === 1 ) {
        sound = 0;
        soundBtn.textContent = ('Sound Off');
        pewPew.muted = true;
    }
    else if (sound === 0 ) {
        sound = 1;
        soundBtn.textContent = ('Sound On');
        pewPew.muted = false;
    }
    else {
        console.log(`Sound error`);
    }
})




