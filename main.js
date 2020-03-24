// Countdown Timer
// By Todd Demone
// last updated: 2020-03-24

// Access the relevant HTML elements
const startButton = document.getElementById('startButton');
const hoursFace = document.getElementById('hoursFace');
const minutesFace = document.getElementById('minutesFace');
const secondsFace = document.getElementById('secondsFace');

// Get initial start time from user
const hours = parseInt(prompt('How many HOURS do you want to add to the timer?'));
const minutes = parseInt(prompt('How many MINUTES do you want to add to the timer?'));
const seconds = parseInt(prompt('How many SECONDS do you want to add to the timer?'));

let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

// Set the initial start time on the clock 
const hoursStart = Math.floor( totalSeconds / 3600 );
const minutesStart = Math.floor( (totalSeconds % 3600) / 60 );
const secondsStart = ( totalSeconds % 3600 ) % 60 ;
// update the View 
hoursFace.innerHTML = ` ${hoursStart < 10 ? '0' : ''}${hoursStart}`;
minutesFace.innerHTML = ` ${minutesStart < 10 ? '0' : ''}${minutesStart}`;
secondsFace.innerHTML = ` ${secondsStart < 10 ? '0' : ''}${secondsStart}`;

// Click the start button to start the countdown
startButton.addEventListener( 'click', startTimer );

function startTimer() {
  startButton.removeEventListener( 'click', startTimer ); // disable the "Click to Start" button so multiple clicks don't speed up the timer!
  const invokeInterval = window.setInterval( tick, 1000 ); // run the tick() function every 1000 milliseconds
  
  function tick() {
    if (totalSeconds < 0) {
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

    const hoursRemaining = Math.floor( totalSeconds / 3600 );
    const minutesRemaining = Math.floor( (totalSeconds % 3600) / 60 );
    const secondsRemaining = ( totalSeconds % 3600 ) % 60 ;
    
    // View
    hoursFace.innerHTML = ` ${hoursRemaining < 10 ? '0' : ''}${hoursRemaining}`;
    minutesFace.innerHTML = ` ${minutesRemaining < 10 ? '0' : ''}${minutesRemaining}`;
    secondsFace.innerHTML = ` ${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    
    
  }
}






