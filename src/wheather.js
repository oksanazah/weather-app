function showDate(currentDate) {
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let currentDay = days[currentDate.getDay()];
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

function showWeather(response) {
  document.querySelector('#temperature').innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector('#current-city').innerHTML = response.data.name;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector('#weather').innerHTML = response.data.weather[0].main;
}

function showCity(selectCity) {
  let apiKey = 'a5ab1c192d0abb8931f254cb8480b7bd';
  let units = 'metric';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&APPID=${apiKey}&units=${units}`;

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

let currentDate = new Date();
let showDay = document.querySelector('#current-day');
showDay.innerHTML = showDate(currentDate);

let enterCity = document.querySelector('#form-city');
enterCity.addEventListener('submit', submitCity);

var currentButton = document.querySelector('#current-button');
currentButton.addEventListener('click', myLocation);

showCity('London');

// function showTempFahrenheit() {
//     let currentTemp = document.querySelector('#temperature');
//     currentTemp.innerHTML = `${Math.round((response.data.main.temp * 9 / 5) + 32)}`;
// }

// let celsiusTemp = document.querySelector('#celsius');
// let fahrenheitTemp = document.querySelector('#fahrenheit');

// celsiusTemp.addEventListener('click', showTempCelsius);
// fahrenheitTemp.addEventListener('click', showTempFahrenheit);
