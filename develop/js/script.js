const ApiKey = 'e056262784ffdafbf6ade366af95c9d9'
// let currentDay = dayjs().format("dddd, YYYY-MM-DD");
const city = 'Denver';
const country = 'US';

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=e056262784ffdafbf6ade366af95c9d9`)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.list.length; i += 8) {
      const temperature = data.list[i].main.temp;
      const windSpeed = data.list[i].wind.speed;
      const humidity = data.list[i].main.humidity;
      console.log(`Day ${(i / 8) + 1}:`);
      console.log(`Temperature: ${temperature}°F`);
      console.log(`Wind Speed: ${windSpeed} mph`);
      console.log(`Humidity: ${humidity}%`);
      console.log('');
    }
  })
  .catch(error => console.error(error));