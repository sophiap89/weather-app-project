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

// Challenge 2 //

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-engine");
  let currentPlace = `${input.value}`;
  let newCity = document.querySelector("#city-weather");
  newCity.innerHTML = currentPlace;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
