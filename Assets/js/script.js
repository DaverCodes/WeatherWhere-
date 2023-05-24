

const ApiKey = 'e056262784ffdafbf6ade366af95c9d9'
// let currentDay = dayjs().format("dddd, YYYY-MM-DD");
// const city = '';
const country = 'US';
const searchCity = document.getElementById("searchButton")
const textCity = document.getElementById("textArea")
const todayC = document.getElementById("todayC")
const todayT = document.getElementById("todayT")
const todayW = document.getElementById("todayW")
const todayH = document.getElementById("todayH")

var today = dayjs();


searchCity.addEventListener("click",function (event) {
    const cityName = textCity.value
    console.log(cityName);
    event.preventDefault()
    getForecast(cityName)

})

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
    })}

