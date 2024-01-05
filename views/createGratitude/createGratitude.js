document.addEventListener('DOMContentLoaded', async function () {
    const gratitudeForm = document.getElementById('gratitudeForm');

    gratitudeForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const entry = document.getElementById('entry').value;

         console.log(date)
         console.log(entry)

        // const formData = new FormData();
        // formData.append('date', date);
        // formData.append('entry', entry);

        // console.log('FormData:', formData);


        const  gratitudeForm= {
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
                body: JSON.stringify(gratitudeForm),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to handle button clicks

    // Function to navigate to the home page
    function navigateToHome() {
        window.location.href = '/index.html';
    }

    // Event listener for home button click
    document.getElementById('homeButton').addEventListener('click', navigateToHome);
});









