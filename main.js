// Countdown Timer
// By Todd Demone
// last updated: 2020-03-24

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const hoursFace = document.getElementById('hoursFace');
const minutesFace = document.getElementById('minutesFace');
const secondsFace = document.getElementById('secondsFace');

// Get initial start time from user (the initial values are stored as constants in case the user wants to reset the timer)
const hours = parseInt(prompt('How many HOURS do you want to add to the timer?'));
const minutes = parseInt(prompt('How many MINUTES do you want to add to the timer?'));
const seconds = parseInt(prompt('How many SECONDS do you want to add to the timer?'));

let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
let hoursRemaining, minutesRemaining, secondsRemaining;
let invokeInterval = null; // this is where window.setInterval() will be stored. It needs to be global so I can toggle between 'Start' and 'Pause'

// Set the initial start time on the clock 
calculateTimeRemaining();
drawClockFace();

// Click the start button to start the countdown
startButton.addEventListener( 'click', toggleTimer );
resetButton.addEventListener( 'click', reset );

function toggleTimer() {
  if (!invokeInterval) { // this block starts the timer
    invokeInterval = window.setInterval( tick, 1000 );
    startButton.innerHTML = 'Pause';
  } else { // this block pauses the timer
    window.clearInterval(invokeInterval);
    invokeInterval = null;
    startButton.innerHTML = 'Start';
  }
}

function tick() {
  if (totalSeconds === 0) {
    endTimer();
  } else {
    removeOneSecond();
  }
}

function endTimer() {
  window.clearInterval(invokeInterval); // stops the recurring calls to tick()
  // View
  const timesUp = document.getElementById('timesUp');
  timesUp.innerHTML = "Time's up!";
}

function removeOneSecond() {
  totalSeconds--;
  calculateTimeRemaining();
  drawClockFace();
}

function calculateTimeRemaining() {
  hoursRemaining = Math.floor( totalSeconds / 3600 );
  minutesRemaining = Math.floor( (totalSeconds % 3600) / 60 );
  secondsRemaining = ( totalSeconds % 3600 ) % 60;
}

function drawClockFace() {
  hoursFace.innerHTML = `${hoursRemaining < 10 ? '0' : ''}${hoursRemaining}`;
  minutesFace.innerHTML = `${minutesRemaining < 10 ? '0' : ''}${minutesRemaining}`;
  secondsFace.innerHTML = `${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
}

function reset() {
  window.clearInterval(invokeInterval);
  invokeInterval = null;
  totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
  calculateTimeRemaining();
  drawClockFace();
  startButton.innerHTML = 'Start';
}

/***********************
 * Edit Timer Board
 * ********************/
 
const clockArray = [0, 0, 0, 0, 0, 0];
const clockFace = document.getElementById("clockFace");
let clockString = "00h00m00s";
const keys = document.querySelectorAll("#keyPad > .row > .key");
keys.forEach(function (key) {
  key.addEventListener("click", populateTimer);
});
let counter = 1;

function populateTimer(e) {
  if (counter === 6) {
    keys.forEach(function (key) {
      key.removeEventListener("click", populateTimer);
    });
  }
  const digitInputted = e.target.innerText;
  clockArray.push(digitInputted);
  clockArray.shift();
  clockString = "";
  clockArray.forEach(function (digit, index) {
    clockString += digit;
    if (index === 1) {
      clockString += "<span>h </span> ";
    }
    if (index === 3) {
      clockString += "<span>m </span> ";
    }
    if (index === 5) {
      clockString += "<span>s </span> ";
    }
  });
  clockFace.innerHTML = clockString;
  counter++;
}

