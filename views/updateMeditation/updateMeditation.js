document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const meditationId = urlParams.get('id');
    const date = urlParams.get('date');
    const duration = urlParams.get('duration');
    const notes = urlParams.get('notes');

    const dateInput = document.getElementById('date');
    const durationInput = document.getElementById('duration');
    const notesInput = document.getElementById('notes');

    console.log('dateInput:', dateInput);
    console.log('durationInput:', durationInput);
    console.log('notesInput:', notesInput);

    if (dateInput) {
        dateInput.value = formatDate(date);
    }

    if (durationInput) {
        durationInput.value = duration;
    }

    if (notesInput) {
        notesInput.value = notes;
    }

    const form = document.getElementById('meditationForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const updatedDate = document.getElementById('date').value;
            const updatedDuration = document.getElementById('duration').value;
            const updatedNotes = document.getElementById('notes').value;

            console.log('Submitting form with updated values:', updatedDate, updatedDuration, updatedNotes);
            updateMeditationEntry(meditationId, updatedDate, updatedDuration, updatedNotes);
        });
    }

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
            window.location.href = '/index.html';
        });
    }
});

async function updateMeditationEntry(id, date, duration, notes) {
    try {
        const response = await fetch(`http://localhost:7008/lila/update-meditation-entry/${date}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newDate: date,
                duration,
                notes,
            }),
        });

        if (response.ok) {
            console.log('Meditation entry updated successfully!');
            window.location.href = '../meditationEntries/meditationEntries.html';
        } else {
            console.error('Error updating meditation entry:', response.status);
        }
    } catch (error) {
        console.error('Error updating meditation entry:', error);
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate !== 'Invalid Date' ? formattedDate : '';
}

// Event listener for home button click
document.getElementById('homeButton').addEventListener('click', function () {
    console.log('Home button clicked');
    window.location.href = 'index.html';
});



