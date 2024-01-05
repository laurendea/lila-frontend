document.addEventListener('DOMContentLoaded', function () {
    const meditationForm = document.getElementById('meditationForm');

    meditationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const duration = document.getElementById('duration').value;
        const notes = document.getElementById('notes').value;

        const meditationEntryData = {
            date: date,
            duration: duration,
            notes: notes
        };

        console.log('meditationEntryData ', meditationEntryData);

        const endpoint = 'https://lila-backend-8abfdeda606c.herokuapp.com/lila/create-meditation-entry';

        // Make the fetch POST request
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meditationEntryData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            
            // Redirect to the meditation entries page upon successful submission
            window.location.href = '/views/meditationEntries/meditationEntries.html';
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error scenarios if needed
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // JavaScript to handle button clicks
  
    // Function to navigate to the home page
    function navigateToHome() {
      window.location.href = '/views/log options/log_options.html';
    }
  
    // Event listener for home button click
    document.getElementById('homeButton').addEventListener('click', navigateToHome);
});


