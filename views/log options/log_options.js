document.addEventListener('DOMContentLoaded', function() {
    // JavaScript to handle button clicks and navigate to respective pages

    // Function to navigate to the gratitude entries page
    function navigateToGratitude() {
        window.location.href = 'gratitudeEntries.html';
    }

    // Function to navigate to the meditation entries page
    function navigateToMeditation() {
        window.location.href = '/views/meditationEntries/meditationEntries.html';
    }

    // Event listeners for button clicks
    document.getElementById('gratitudeButton').addEventListener('click', navigateToGratitude);
    document.getElementById('meditationButton').addEventListener('click', navigateToMeditation);
});

document.addEventListener('DOMContentLoaded', function() {
    // JavaScript to handle button clicks
  
    // Function to navigate to the home page
    function navigateToHome() {
      window.location.href = '/index.html';
    }
  
    // Event listener for home button click
    document.getElementById('homeButton').addEventListener('click', navigateToHome);
  });