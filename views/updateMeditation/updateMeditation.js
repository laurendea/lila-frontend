document.addEventListener('DOMContentLoaded', function () {
    const meditationForm = document.getElementById('updateMeditationForm');

    if (meditationForm) {
        // Retrieve URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const meditationDate = urlParams.get('date');
        const duration = urlParams.get('duration');
        const notes = urlParams.get('notes');

        // Display values in the form fields
        displayMeditationData(meditationDate, duration, notes);

        // Form submission event listener
        meditationForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedDate = document.getElementById('date').value;
            const updatedDuration = document.getElementById('duration').value;
            const updatedNotes = document.getElementById('notes').value;

            console.log('Submitting form with updated values:', updatedDate, updatedDuration, updatedNotes);

            try {
                const response = await fetch(`https://lila-backend-8abfdeda606c.herokuapp.com/lila/update-meditation-entry/${updatedDate}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newDate: updatedDate,
                        duration: updatedDuration,
                        notes: updatedNotes,
                    }),
                });

                if (response.ok) {
                    const updatedEntry = await response.json();
                    console.log('Updated Entry:', updatedEntry);
                    console.log('Meditation entry updated successfully!');
                    

                    // Redirect to the meditation entries page using an absolute path
                    window.location.href = '../meditationEntries/meditationEntries.html';
                } else {
                    const errorText = await response.text();
                    console.error('Error updating meditation entry:', response.status, errorText);
                    
                }
            } catch (error) {
                console.error('Error updating meditation entry:', error);
                
            }
        });

        // Delete button event listener
        const deleteButton = document.getElementById('deleteButton');
        if (deleteButton) {
            deleteButton.addEventListener('click', async function () {
                try {
                    const response = await fetch(`https://lila-backend-8abfdeda606c.herokuapp.com/lila/delete-meditation-entry/${meditationDate}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        console.log('Meditation entry deleted successfully!');
                        

                        // Redirect to the meditation entries page
                        window.location.href = '../meditationEntries/meditationEntries.html';
                    } else {
                        const errorText = await response.text();
                        console.error('Error deleting meditation entry:', response.status, errorText);
                        
                    }
                } catch (error) {
                    console.error('Error deleting meditation entry:', error);
                    
                }
            });
        }
    }

    // Your existing code for backButton, homeButton, etc.
    const backButton = document.querySelector('.backButton');
    if (backButton) {
        backButton.addEventListener('click', function () {
            console.log('Back button clicked');
            window.location.href = '../meditationEntries/meditationEntries.html';
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

function displayMeditationData(date, duration, notes) {
    const dateInput = document.getElementById('date');
    const durationInput = document.getElementById('duration');
    const notesInput = document.getElementById('notes');

    if (dateInput) {
        dateInput.value = date || '';
    }

    if (durationInput) {
        durationInput.value = duration || '';
    }

    if (notesInput) {
        notesInput.value = notes || '';
    }
}



  














