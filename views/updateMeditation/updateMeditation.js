async function fetchMeditationEntries() {
    try {
        const response = await fetch('http://localhost:7008/lila/meditation-entries');
        if (response.ok) {
            const entries = await response.json();
            return entries;
        } else {
            console.error('Error fetching meditation entries:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching meditation entries:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const meditationDate = urlParams.get('date'); // Change 'id' to 'date'

    const dateInput = document.getElementById('date');
    const durationInput = document.getElementById('duration');
    const notesInput = document.getElementById('notes');

    console.log('Meditation Date:', meditationDate);

    // Fetch and display meditation data
    const meditationEntries = await fetchMeditationEntries();
    const selectedMeditation = meditationEntries.find(entry => entry.date === meditationDate);
    displayMeditationData(selectedMeditation);

    const form = document.getElementById('meditationForm');
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const updatedDate = document.getElementById('date').value;
            const updatedDuration = document.getElementById('duration').value;
            const updatedNotes = document.getElementById('notes').value;

            console.log('Submitting form with updated values:', updatedDate, updatedDuration, updatedNotes);
            
            // Include newDuration and newNotes in the updateMeditationEntry function
            await updateMeditationEntry(meditationDate, updatedDate, updatedDuration, updatedNotes);

            // Clear the form fields
            if (dateInput) {
                dateInput.value = '';
            }

            if (durationInput) {
                durationInput.value = '';
            }

            if (notesInput) {
                notesInput.value = '';
            }
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

async function updateMeditationEntry(date, newDate, duration, notes) {
    try {
      const response = await fetch(`http://localhost:7008/lila/update-meditation-entry/${date}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newDate,
          duration,
          notes,
        }),
      });
  
      if (response.ok) {
        const updatedEntry = await response.json();
        console.log('Updated Entry:', updatedEntry);
        console.log('Meditation entry updated successfully!');
        alert('Meditation entry updated successfully!');
      } else {
        const errorText = await response.text();
        console.error('Error updating meditation entry:', response.status, errorText);
        alert('Error updating meditation entry. Check the console for details.');
      }
    } catch (error) {
      console.error('Error updating meditation entry:', error);
      alert('Error updating meditation entry. Check the console for details.');
    }
}
  

  

function displayMeditationData(entry) {
    const dateInput = document.getElementById('date');
    const durationInput = document.getElementById('duration');
    const notesInput = document.getElementById('notes');

    if (entry && dateInput) {
        dateInput.value = entry.date ? formatDate(entry.date) : '';
    }

    if (entry && durationInput) {
        durationInput.value = entry.duration || '';
    }

    if (entry && notesInput) {
        notesInput.value = entry.notes || '';
    }
}

function formatDate(dateString) {
    // Convert the input date string to a Date object
    const inputDate = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date');
    }

    // Format the date as "yyyy-MM-dd"
    const formattedDate = inputDate.toISOString().split('T')[0];
    return formattedDate;
}

// Event listener for home button click
document.getElementById('homeButton').addEventListener('click', function () {
    console.log('Home button clicked');
    window.location.href = '/index.html';
});










