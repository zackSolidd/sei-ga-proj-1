console.log("hello world");

let score = 0;
let gameTime = 8;
let gameState = 0; //0 press start to play, 1 press restart first then press 1;

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
let countDownTimer = document.createElement('p');

scoreBoard.innerHTML = (`Score = ${score}`);
countDownTimer.innerHTML = (`Timer = ${gameTime}`);

container.appendChild(startBtn);
container.appendChild(stopBtn);
container.appendChild(restartBtn);
container.appendChild(scoreBoard);
container.appendChild(countDownTimer);

let target = document.querySelectorAll(".target");
//functions 
function changeColor(){
    if ( gameState === 0 ) {
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
    }
    else {
        alert("Please press Restart");
    }
};

var timerInterval;

function timerCountDownFunction() {
    gameTime--;
    countDownTimer.innerHTML = (`Timer = ${gameTime}`); 
    if (gameTime === 0) {
        alert(`Times Up !!! \n Your Score is ${score}`);
        clearInterval(timerInterval);
        gameState = 1;
    }
}

// event listener
startBtn.addEventListener('click', function() {
    //startTime();
    setTimeout(changeColor,3000);
    timerInterval = setInterval(timerCountDownFunction,1000);
})

stopBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    gameState = 1;
})

restartBtn.addEventListener('click', function() {
    for (let i = 0 ; i < target.length ; i++) {
        target[i].style.backgroundColor = "white";
    }
    score = 0;
    gameTime = 8;
    scoreBoard.innerHTML = (`Score = 0`);
    countDownTimer.innerHTML = (`Timer = 5`);
    gameState = 0;
})






