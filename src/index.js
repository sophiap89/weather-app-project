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
  let tempElement = document.querySelector("#temp-celsius");
  tempElement.innerHTML = `${temp}`;
  let newCity = document.querySelector("#city-weather");
  newCity.innerHTML = response.data.city;
  let forecastDescription = response.data.condition.description;
  let forecast = document.querySelector("#weather-description");
  forecast.innerHTML = forecastDescription;
  let windSpeed = Math.round(response.data.wind.speed);
  let speed = document.querySelector("#speed");
  speed.innerHTML = windSpeed;
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

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let tempCelsiusElement = document.querySelector("#temp-celsius");
let tempFahrenheitElement = document.querySelector("#temp-fahrenheit");
let isCelsius = true;

celsiusLink.addEventListener("click", function () {
  if (!isCelsius) {
    let tempFahrenheit = tempFahrenheitElement.textContent;
    let tempCelsius = ((tempFahrenheit - 32) * 5) / 9;
    tempCelsiusElement.textContent = Math.round(tempCelsius);
    tempFahrenheitElement.textContent = ""; // Clear Fahrenheit value
    isCelsius = true;
  }
});

fahrenheitLink.addEventListener("click", function () {
  if (isCelsius) {
    let tempCelsius = tempCelsiusElement.textContent;
    let tempFahrenheit = (tempCelsius * 9) / 5 + 32;
    tempFahrenheitElement.textContent = Math.round(tempFahrenheit);
    tempCelsiusElement.textContent = ""; // Clear Celsius value
    isCelsius = false;
  }
});
