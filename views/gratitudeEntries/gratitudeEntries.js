document.addEventListener('DOMContentLoaded', function () {
    const createGratitudeEntryButton = document.getElementById('createGratitudeEntryButton');
    const gratitudeEntriesContainer = document.getElementById('gratitudeEntriesContainer');

    // Function to fetch and display gratitude entries by date
    const fetchAndDisplayGratitudeEntries = async () => {
        try {
            const response = await fetch('https://lila-backend-8abfdeda606c.herokuapp.com/lila/gratitude-entries', {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });

            if (response.ok) {
                const gratitudeEntries = await response.json();
                displayGratitudeEntries(gratitudeEntries);
            } else {
                console.error('Error fetching gratitude entries:', response.status);
            }
        } catch (error) {
            console.error('Error fetching gratitude entries:', error);
        }
    };

    const displayGratitudeEntries = (entries) => {
        gratitudeEntriesContainer.innerHTML = '';

        entries.forEach(gratitudeEntry => { // Change the parameter name to 'gratitudeEntry'
            const entryElement = document.createElement('div');
            entryElement.innerHTML = `<p class="entry" data-id="${gratitudeEntry._id}">${gratitudeEntry.date} - ${gratitudeEntry.entry} - </p>`;

            // Add an event listener to navigate to the update page with the entry's data
            entryElement.addEventListener('click', () => navigateToUpdatePage(gratitudeEntry));

            gratitudeEntriesContainer.appendChild(entryElement);
        });
    };

    // Function to navigate to the update page with the entry's data
    const navigateToUpdatePage = (entry) => {
        const { _id, date, entry: entryText } = entry; // Rename 'entry' to 'entryText'
        window.location.href = `/views/updateGratitude/updateGratitude.html?id=${_id}&date=${date}&entry=${entryText}`;
    };

    // Event listener for creating a new entry
    createGratitudeEntryButton.addEventListener('click', function () {
        // Navigate to the "Create Gratitude Entry" page
        window.location.href = '/views/createGratitude/createGratitude.html';
    });

    // Fetch and display gratitude entries when the page loads
    fetchAndDisplayGratitudeEntries();
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

