document.addEventListener('DOMContentLoaded', async function () {
    const gratitudeForm = document.getElementById('gratitudeForm');

    gratitudeForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const entry = document.getElementById('entry').value;
        const photoInput = document.getElementById('photo');
        const photoFile = photoInput.files[0];

        const gratitudeData = new FormData();
        gratitudeData.append('date', date);
        gratitudeData.append('entry', entry);
        gratitudeData.append('photo', photoFile);

        console.log('Gratitude Data:', gratitudeData);

        const endpoint = 'https://lila-backend-8abfdeda606c.herokuapp.com/lila/create-gratitude-entry';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: gratitudeData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);

            // Redirect to the gratitude entries page upon successful submission
            window.location.href = '/views/gratitudeEntries/gratitudeEntries.html';
        } catch (error) {
            console.error('Error:', error);
            // Handle error scenarios if needed
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to handle button clicks

    // Function to navigate to the home page
    function navigateToHome() {
        window.location.href = '/views/log options/log_options.html';
    }

    // Event listener for home button click
    document.getElementById('homeButton').addEventListener('click', navigateToHome);
});















