function showDate(currentDate) {
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDay = days[currentDate.getDay()];
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

function showWeekDay(timestamp) {
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function showForcast(response) {
  let forcastData = response.data.daily;

  let forcast = document.getElementById('forcast');

  let forcastHTML = '';

  forcastData.forEach(function (day, index) {
    if (index < 5) {
      forcastHTML += `
    <div class="col days">
      <div>${showWeekDay(day.time)}</div>
      <div>
        <img src="images/${day.condition.icon}.png" />
      </div>
      <div>
        <span>${Math.round(day.temperature.maximum)}°</span>
        <span id="night"> ${Math.round(day.temperature.minimum)}°</span>
      </div>
    </div>
  `;
    }
  });

  forcast.innerHTML = forcastHTML;
}

function getForcast(city) {
  let apiKey = 'ff63602b5ab4ddad021a4od399t4f1d1';
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForcast);
}

function showWeather(response) {
  document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
  document.querySelector('#current-city').innerHTML = response.data.name;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
  document.querySelector('#weather').innerHTML = response.data.weather[0].main;
  document
    .querySelector('#image-icon')
    .setAttribute('src', `images/${response.data.weather[0].icon}.png`);

  celsiusTemp = response.data.main.temp;

  getForcast(response.data.name);
}

function showCity(selectCity) {
  let apiKey = 'a5ab1c192d0abb8931f254cb8480b7bd';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&APPID=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let selectCity = document.querySelector('#enter-city').value;
  showCity(selectCity);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = 'a5ab1c192d0abb8931f254cb8480b7bd';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTempFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector('#temperature');
  celsiusitLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  currentTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function showTempCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector('#temperature');
  celsiusitLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let currentDate = new Date();
let showDay = document.querySelector('#current-day');
showDay.innerHTML = showDate(currentDate);

let currentButton = document.querySelector('#current-button');
currentButton.addEventListener('click', myLocation);

let enterCity = document.querySelector('#form-city');
enterCity.addEventListener('submit', submitCity);

let celsiusTemp = null;
let fahrenheitLink = document.querySelector('#fahrenheit');
let celsiusitLink = document.querySelector('#celsius');

celsiusitLink.addEventListener('click', showTempCelsius);
fahrenheitLink.addEventListener('click', showTempFahrenheit);

showCity('London');
