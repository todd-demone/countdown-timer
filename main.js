// Countdown Timer
// By Todd Demone
// last updated: 2020-03-24

// Global variables
let seconds = prompt('How many seconds do you want to add to the timer?')
const startButton = document.getElementById('startButton');

// Event Listeners
startButton.addEventListener('click', startTimer);

function startTimer() {
  const invokeInterval = window.setInterval(removeASecond, 1000);
  const secondsFace = document.getElementById('secondsFace');
  const timesUp = document.getElementById('timesUp');
  
  function removeASecond() {
    if (seconds < 0) {
      window.clearInterval(invokeInterval);
      timesUp.innerHTML = "Time's up!";
      return;
    }
    secondsFace.innerHTML = seconds;
    seconds--;
  }
}

function timesUp() {
  const timesUp = document.getElementById('timesUp');
  window.clearInterval(invokeInterval);
  timesUp.innerHTML = "Time's up!";
}

function removeASecond() {
  const secondsFace = document.getElementById('secondsFace');
  secondsFace.innerHTML = seconds;
  seconds--;
}


