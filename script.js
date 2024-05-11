async function getWeatherData(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=8ae45f2bc773488b89a220808240905&q=${city}&days=1&aqi=no&alerts=no`
  );
  const data = await response.json();
  displayWeatherData(data);
  chooseGif(data);
}

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const city = document.querySelector('input').value;
  if (city) {
    getWeatherData(city);
  }
});

function displayWeatherData(data) {
  const location = document.querySelector('#location');
  const temperature = document.querySelector('#temperature');
  const description = document.querySelector('#description');
  const humidity = document.querySelector('#humidity');
  const wind = document.querySelector('#wind');
  const sunrise = document.querySelector('#sunrise');
  const sunset = document.querySelector('#sunset');

  location.textContent = `${data.location.name}, ${data.location.country}`;
  temperature.textContent = `${data.current.temp_c}°C`;
  description.textContent = `${data.forecast.forecastday[0].day.condition.text}`;
  humidity.textContent = `Humidity ${data.current.humidity}%`;
  wind.textContent = `Wind ${data.current.wind_kph} km/h`;
  sunrise.textContent = `Sunrise ${data.forecast.forecastday[0].astro.sunrise}`;
  sunset.textContent = `Sunset ${data.forecast.forecastday[0].astro.sunset}`;
}

async function chooseGif(data) {
  const icon = document.querySelector('#icon');
  const city = document.querySelector('input').value;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b40063f1e29900584626d034d2979bb`,
    { mode: 'cors' }
  );
  if (!response.ok) {
    throw new Error('Couldnt fetch weather data');
  }
  const weatherData = await response.json();
  const iconId = weatherData.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
}
