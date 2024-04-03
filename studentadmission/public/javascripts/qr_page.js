document.addEventListener("DOMContentLoaded", function () {
    // Set the countdown time in seconds (5 minutes)
    let countdownTime = 300;
    const countdownElement = document.getElementById('countdown');
  
    // Start the countdown timer
    const countdownInterval = setInterval(function () {
      const minutes = Math.floor(countdownTime / 60);
      const seconds = countdownTime % 60;
  
      countdownElement.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        // Optional: Redirect to another page or perform additional actions when the countdown reaches 0
      } else {
        countdownTime--;
      }
    }, 1000);
  });
  