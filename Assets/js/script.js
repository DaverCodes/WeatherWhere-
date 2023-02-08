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

// https://openweathermap.org/img/w/{icon}.png concat from api render as img tag


var today = dayjs();


searchCity.addEventListener("click",function (event) {
    const cityName = textCity.value
    console.log(cityName);
    event.preventDefault()
    getForecast(cityName)

})

function getForecast(cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname},${country}&units=imperial&appid=e056262784ffdafbf6ade366af95c9d9`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.list.length; i += 8) {
          const temperature = data.list[i].main.temp;
          const windSpeed = data.list[i].wind.speed;
          const humidity = data.list[i].main.humidity;
          todayC.textContent = cityname + " " + today.format('MMM DD, YYYY [at] hh:mm a')
          todayT.textContent = "Temp: " + temperature + "°F"
          todayW.textContent = "Wind: " + windSpeed + "MPH"
          todayH.textContent = "Humidity: " + humidity  + "%"
          console.log(`Day ${(i / 8) + 1}:`);
          console.log(`${icon}`);
          console.log(`Temperature: ${temperature}°F`);
          console.log(`Wind Speed: ${windSpeed} mph`);
          console.log(`Humidity: ${humidity}%`);
          console.log('');
        }
      })
      .catch(error => console.error(error));
    
}