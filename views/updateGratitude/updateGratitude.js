document.addEventListener('DOMContentLoaded', function () {
    const updateGratitudeForm = document.getElementById('updateGratitudeForm');

    if (updateGratitudeForm) {
        // Retrieve URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const gratitudeDate = urlParams.get('date');
        const entry = urlParams.get('entry');

        // Display values in the form fields
        displayGratitudeData(gratitudeDate, entry);

        // Form submission event listener
        updateGratitudeForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedDate = document.getElementById('date').value;
            const updatedEntry = document.getElementById('entry').value;

            console.log('Submitting form with updated values:', updatedDate, updatedEntry);

            try {
                const response = await fetch(`https://lila-backend-8abfdeda606c.herokuapp.com/lila/update-gratitude-entry/${gratitudeDate}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newDate: updatedDate,
                        entry: updatedEntry,
                    }),
                });

                if (response.ok) {
                    const updatedEntry = await response.json();
                    console.log('Updated Entry:', updatedEntry);
                    console.log('Gratitude entry updated successfully!');
                    alert('Gratitude entry updated successfully!');

                    // Redirect to the gratitude entries page using an absolute path
                    window.location.href = '../gratitudeEntries/gratitudeEntries.html';
                } else {
                    const errorText = await response.text();
                    console.error('Error updating gratitude entry:', response.status, errorText);
                    alert('Error updating gratitude entry. Check the console for details.');
                }
            } catch (error) {
                console.error('Error updating gratitude entry:', error);
                alert('Error updating gratitude entry. Check the console for details.');
            }
        });

        // Delete button event listener
        const deleteButton = document.getElementById('deleteButton');
        if (deleteButton) {
            deleteButton.addEventListener('click', async function () {
                try {
                    const response = await fetch(`https://lila-backend-8abfdeda606c.herokuapp.com/lila/delete-gratitude-entry/${gratitudeDate}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        console.log('Gratitude entry deleted successfully!');
                        alert('Gratitude entry deleted successfully!');

                        // Redirect to the gratitude entries page
                        window.location.href = '../gratitudeEntries/gratitudeEntries.html';
                    } else {
                        const errorText = await response.text();
                        console.error('Error deleting gratitude entry:', response.status, errorText);
                        alert('Error deleting gratitude entry. Check the console for details.');
                    }
                } catch (error) {
                    console.error('Error deleting gratitude entry:', error);
                    alert('Error deleting gratitude entry. Check the console for details.');
                }
            });
        }
    }

    // Your existing code for backButton, homeButton, etc.
    const backButton = document.querySelector('.backButton');
    if (backButton) {
        backButton.addEventListener('click', function () {
            console.log('Back button clicked');
            window.location.href = '../gratitudeEntries/gratitudeEntries.html';
        });
    }

    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', function () {
            console.log('Home button clicked');
            window.location.href = '/views/log options/log_options.html';
        });
    }
});

function displayGratitudeData(date, entry, photo) {
    const dateInput = document.getElementById('date');
    const entryInput = document.getElementById('entry');

    if (dateInput) {
        dateInput.value = date || '';
    }

    if (entryInput) {
        entryInput.value = entry || '';
    }

}
