console.log("hello world");

let score = 0;

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

scoreBoard.innerHTML = (`Score = ${score}`)

container.appendChild(startBtn);
container.appendChild(stopBtn);
container.appendChild(restartBtn);
container.appendChild(scoreBoard);

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
            scoreBoard.innerHTML = (`Score = ${score}`)
        }
        else {console.log('false')};
    })

}

var colorTiming;

function startTime() {
    colorTiming= setInterval(changeColor,1000);
}

// event listener
startBtn.addEventListener('click', function() {
    startTime()
})

stopBtn.addEventListener('click', function() {
    clearInterval(colorTiming);
})

restartBtn.addEventListener('click', function() {
    for (let i = 0 ; i < target.length ; i++) {
        target[i].style.backgroundColor = "white";
    }
    clearInterval(colorTiming);
    scoreBoard.innerHTML = (`Score = 0`)
})






