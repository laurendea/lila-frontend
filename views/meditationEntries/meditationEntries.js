document.addEventListener('DOMContentLoaded', function () {
    const createMeditationEntryButton = document.getElementById('createMeditationEntryButton');
    const meditationEntriesContainer = document.getElementById('meditationEntriesContainer');

    // Function to fetch and display meditation entries by date
    const fetchAndDisplayMeditationEntries = async () => {
        try {
            // Get today's date in the format "YYYY-MM-DD"
            const today = new Date().toISOString().split('T')[0];
            
            // Fetch meditation entries for today
            const response = await fetch(`http://localhost:7008/lila/meditation-entries?date=${today}`);

            if (response.ok) {
                const meditationEntries = await response.json();
                displayMeditationEntries(meditationEntries);
            } else {
                console.error('Error fetching meditation entries:', response.status);
            }
        } catch (error) {
            console.error('Error fetching meditation entries:', error);
        }
    };

    const displayMeditationEntries = (entries) => {
        meditationEntriesContainer.innerHTML = '';

        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.innerHTML = `<p class="entry" data-id="${entry._id}" data-date="${entry.date}">${entry.date} - ${entry.duration} - ${entry.notes}</p>`;

            // Add an event listener to edit the entry when clicked
            entryElement.addEventListener('click', () => editMeditationEntry(entry.date));

            meditationEntriesContainer.appendChild(entryElement);
        });
    };

    // Function to edit a meditation entry
    const editMeditationEntry = (date) => {
        // Fetch the specific data for the clicked date
        fetch(`http://localhost:7008/lila/meditation-entries?date=${date}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error fetching meditation entry for date ${date}: ${response.status}`);
                }
            })
            .then(data => {
                // Navigate to the updateMeditation.html page with the fetched data
                window.location.href = `/views/updateMeditation/updateMeditation.html?id=${data._id}&date=${data.date}&duration=${data.duration}&notes=${data.notes}`;
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Event listener for creating a new entry
    createMeditationEntryButton.addEventListener('click', function () {
        // Navigate to the "Create Meditation Entry" page
        window.location.href = '/views/createMeditation/create_meditation.html';
    });

    // Fetch and display meditation entries when the page loads
    fetchAndDisplayMeditationEntries();
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