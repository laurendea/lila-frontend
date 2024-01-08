document.addEventListener('DOMContentLoaded', async function () {
    const gratitudeForm = document.getElementById('gratitudeForm');

    gratitudeForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const entry = document.getElementById('entry').value;

        console.log(date);
        console.log(entry);

        const gratitudeFormData = {
            date: date,
            entry: entry
        };

        const endpoint = 'https://lila-backend-8abfdeda606c.herokuapp.com/lila/create-gratitude-entry';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gratitudeFormData),
            });

            if (response.ok) {
                // Successful submission
                console.log('Gratitude entry created successfully!');
                

                // Redirect to the home page
                window.location.href = '/views/gratitudeEntries/gratitudeEntries.html';
            } else {
                // Error handling
                const errorText = await response.text();
                console.error('Error creating gratitude entry:', response.status, errorText);
                
            }
        } catch (error) {
            // Network or other errors
            console.error('Error creating gratitude entry:', error);
         
        }
    });

    // JavaScript to handle button clicks

    // Function to navigate to the home page
    function navigateToHome() {
        window.location.href = '/views/log options/log_options.html';
    }

    // Event listener for home button click
    document.getElementById('homeButton').addEventListener('click', navigateToHome);
});










