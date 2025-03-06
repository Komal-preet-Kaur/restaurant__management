document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value;
    searchRestaurants(searchTerm);
});

async function searchRestaurants(searchTerm) {
    // Replace with your API key
    const apiKey = 'YOUR_API_KEY'; 

    // Construct the API URL
    const apiUrl = `YOUR_API_ENDPOINT?query=${searchTerm}&key=${apiKey}`; 

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayResults(data.results); // Assuming the API returns a 'results' array
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('resultsContainer').innerHTML = 'Error fetching data. Please try again.';
    }
}

function displayResults(restaurants) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (restaurants.length === 0) {
        resultsContainer.innerHTML = 'No restaurants found.';
        return;
    }

    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.classList.add('restaurant');

        // Customize this based on the API response structure
        restaurantDiv.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>${restaurant.address}</p>
            <p>${restaurant.rating}</p>
            <a href="${restaurant.website}">Website</a>
        `;

        resultsContainer.appendChild(restaurantDiv);
    });
}