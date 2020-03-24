// Countdown Timer
// By Todd Demone
// last updated: 2020-03-24

// Global variables
let seconds = prompt('How many seconds do you want to add to the timer?')
const startButton = document.getElementById('startButton');

// Event Listeners
startButton.addEventListener('click', startTimer);

function startTimer() {
  const invokeInterval = window.setInterval(tickTock, 1000);
  
  function tickTock() {
    if (seconds < 0) {
      timesUp();
    } else {
      removeASecond();
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
}






