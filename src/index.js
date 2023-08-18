let todaysDate = new Date();
let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let day = days[todaysDate.getDay()];
let hour = todaysDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = todaysDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = `${day} ${hour}:${minutes}`;

let h5 = document.querySelector("h5");
h5.innerHTML = `${currentDay}`;

function form(event) {
  event.preventDefault();
  let input = document.querySelector("#search-engine");
  let apiKey = "a328fb05b551oa8463fbf10t61b55fb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input.value}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}
let click = document.querySelector("form");
click.addEventListener("submit", form);

function changeIcon(response) {
  let icon = response.data.condition.icon;
  let iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.src = iconUrl;
}

function showTemp(response) {
  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#temp-display");
  tempElement.innerHTML = `${temp}`;
  let newCity = document.querySelector("#city-weather");
  newCity.innerHTML = response.data.city;
  let forecastDescription = response.data.condition.description;
  let forecast = document.querySelector("#weather-description");
  forecast.innerHTML = forecastDescription;
  changeIcon(response);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a328fb05b551oa8463fbf10t61b55fb0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}

function locationButton() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let submit = document.querySelector("#current-location-button");
submit.addEventListener("click", locationButton);
