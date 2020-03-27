// Countdown Timer
// By Todd Demone
// last updated: 2020-03-27

// Global variables 
let clockArray = [0,0,0,0,0,0];
let timeStr = `00h00m00s`;
let totalSecs, hrs, mins, secs;
let counter = 1; // for timerInput()
let invokeInterval = null; // where window.setInterval() is stored. It's global so I can toggle between 'Start' and 'Pause'
const clockFace = document.getElementById("clockFace");
const keys = document.querySelectorAll("#keyPad > .row > .key");
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// Event Listeners
keys.forEach(function (key) {
  key.addEventListener("click", timerInput);
});
startButton.addEventListener( 'click', startPause );
resetButton.addEventListener( 'click', reset );

// Functions
function timerInput(e) {
  if (counter === 6) {
    keys.forEach(function (key) {
      key.removeEventListener("click", timerInput);
    });
  }
  clockArray.push(e.target.innerText);
  clockArray.shift();
  timeStr = '';
  clockArray.forEach(function (digit, index) {
    timeStr += digit;
    if (index === 1) {
      timeStr += "h";
    }
    if (index === 3) {
      timeStr += "m";
    }
    if (index === 5) {
      timeStr += "s";
    }
  });
  drawClock();
  counter++;
}

function startPause() {
  if (!invokeInterval) { // this block starts the timer
    strToNums();
    invokeInterval = window.setInterval( tick, 1000 );
    startButton.innerHTML = 'Pause';
  } else { // this block pauses the timer
    window.clearInterval(invokeInterval);
    invokeInterval = null;
    startButton.innerHTML = 'Start';
  }
}

function reset() {
  window.clearInterval(invokeInterval);
  invokeInterval = null;
  counter = 1;
  keys.forEach(function (key) {
      key.addEventListener("click", timerInput);
    });
  clockArray = [0,0,0,0,0,0];
  timeStr = `00h00m00s`;
  drawClock();
  startButton.innerHTML = 'Start';
}

function strToNums() {
  hrs = parseInt(timeStr[0] + timeStr[1]) * 3600;
  mins = parseInt(timeStr[3] + timeStr[4]) * 60;
  secs = parseInt(timeStr[6] + timeStr[7]);
  totalSecs = hrs + mins + secs;
}

function tick() {
  if (totalSecs === 0) {
    window.clearInterval(invokeInterval);
  } else {
    removeOneSecond();
  }
}

function removeOneSecond() {
  totalSecs--;
  numsToStr();
  drawClock();
}

function numsToStr() {
  hrs = Math.floor( totalSecs / 3600 );
  mins = Math.floor( (totalSecs % 3600) / 60 );
  secs = ( totalSecs % 3600 ) % 60;
  timeStr = `${hrs < 10 ? '0' + hrs : hrs}h${mins < 10 ? '0' + mins : mins}m${secs < 10 ? '0' + secs: secs}s`;
}

function drawClock() {
  clockFace.innerHTML = timeStr;
}



