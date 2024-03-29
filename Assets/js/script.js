const apiKey = 'e056262784ffdafbf6ade366af95c9d9';

// Function to fetch weather data
function fetchTheWeathaData(cityName) {
  // Fetch weather data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Get information from the response
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;

      // Update the HTML to display the current weather
      const currentWeather = document.getElementById('current-weather');
      currentWeather.innerHTML = `Temperature: ${temperature}°F<br>Description: ${description}<br>Wind Speed: ${windSpeed} m/s<br>Humidity: ${humidity}%`;
    })
    .catch(error => {
      // Handle errors if any
      console.log('Error:', error);
    });

  // Fetch 5-day forecast data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Extract relevant information for the next 5 days
      const forecast = data.list.slice(0, 5);

      // Update the HTML to display the 5-day forecast
      const forecastElement = document.getElementById('forecast');
      forecastElement.innerHTML = '';


      forecast.forEach(day => {
        const date = new Date(day.dt * 1000); // Convert timestamp to Date object
        const month = date.getMonth() + 1; // Get month (months are zero-indexed)
        const dayOfMonth = date.getDate(); // Get day of the month
      
        const temperature = day.main.temp;
        const description = day.weather[0].description;
        const humidity = day.main.humidity;
        const iconCode = day.weather[0].icon;
      
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
      
        const iconElement = document.createElement('img');
        iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
        iconElement.alt = 'Weather Icon';
      
        const dateElement = document.createElement('p');
        dateElement.innerHTML = `${month}/${dayOfMonth}`; // Display month and day
      
        const temperatureElement = document.createElement('p');
        temperatureElement.innerHTML = `Temperature: ${temperature}°F`;
      
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = `Description: ${description}`;
      
        const humidityElement = document.createElement('p');
        humidityElement.innerHTML = `Humidity: ${humidity}%`; // Display humidity
      
        forecastCard.appendChild(iconElement);
        forecastCard.appendChild(dateElement);
        forecastCard.appendChild(temperatureElement);
        forecastCard.appendChild(descriptionElement);
        forecastCard.appendChild(humidityElement);
        forecastElement.appendChild(forecastCard);
      });
      

      // Save search query to localStorage
      saveSearchQuery(cityName);
      displaySearchHistory();
    })
    .catch(error => {
      // Handle errors if any
      console.log('Error:', error);
    });
}

// Function to save search query to localStorage
function saveSearchQuery(query) {
  let searchHistory = localStorage.getItem('searchHistory');

  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory);
    // Check if the query already exists in the search history
    if (!searchHistory.includes(query)) {
      searchHistory.push(query);
    }
  } else {
    searchHistory = [query];
  }

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}


// Function to display search history
function displaySearchHistory() {
  const searchHistoryElement = document.getElementById('search-history');
  searchHistoryElement.innerHTML = '';

  const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  if (searchHistory && searchHistory.length > 0) {
    searchHistory.forEach(query => {
      const historyItem = document.createElement('div');
      historyItem.classList.add('search-history-item');
      historyItem.textContent = query;

      // Add click event listener to each history item
      historyItem.addEventListener('click', () => {
        document.getElementById('city-input').value = query;
        fetchTheWeathaData(query);
      });

      searchHistoryElement.appendChild(historyItem);
    });
  }
}

// Function to handle search button click event
function handleSearch() {
  const cityName = document.getElementById('city-input').value;
  fetchTheWeathaData(cityName);
}

// Wait for the HTML to finish loading
document.addEventListener('DOMContentLoaded', () => {
  // Get the search button
  const searchButton = document.getElementById('search-button');

  // Add event listener for the search button
  searchButton.addEventListener('click', handleSearch);

  // Display search history on page load
  displaySearchHistory();
});
