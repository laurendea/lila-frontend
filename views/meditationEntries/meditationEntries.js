document.addEventListener('DOMContentLoaded', function () {
    const createMeditationEntryButton = document.getElementById('createMeditationEntryButton');
    const meditationEntriesContainer = document.getElementById('meditationEntriesContainer');

    // Function to fetch and display meditation entries by date
    const fetchAndDisplayMeditationEntries = async () => {
        try {
            const response = await fetch('https://lila-backend-8abfdeda606c.herokuapp.com/lila/meditation-entries', {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });

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
            entryElement.innerHTML = `<p class="entry" data-id="${entry._id}">${entry.date} - ${entry.duration} - ${entry.notes}</p>`;

            // Add an event listener to navigate to the update page with the entry's data
            entryElement.addEventListener('click', () => navigateToUpdatePage(entry));

            meditationEntriesContainer.appendChild(entryElement);
        });
    };

    // Function to navigate to the update page with the entry's data
    const navigateToUpdatePage = (entry) => {
        const { _id, date, duration, notes } = entry;
        window.location.href = `/views/updateMeditation/updateMeditation.html?id=${_id}&date=${date}&duration=${duration}&notes=${notes}`;
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
