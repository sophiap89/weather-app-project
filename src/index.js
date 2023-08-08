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
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}
let click = document.querySelector("form");
click.addEventListener("submit", form);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-display");
  tempElement.innerHTML = `${temp}`;
  let newCity = document.querySelector("#city-weather");
  newCity.innerHTML = response.data.name;
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}

function locationButton() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
navigator.geolocation.getCurrentPosition(currentLocation);

let submit = document.querySelector("#current-location-button");
submit.addEventListener("click", locationButton);
