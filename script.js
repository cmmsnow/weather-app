//day and time
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");

let now = new Date();
let days = [
  "Sunday ",
  "Monday ",
  "Tuesday ",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday ",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
function fixMinutes(params) {
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
}
fixMinutes();
let time = `${hours}:${minutes}`;

currentDay.innerHTML = day;
currentTime.innerHTML = time;

//city search
function searchCity(searchedCity) {
  let apiKey = "6ad2af0e6e1670b40ddda4b103040cf3";
  let city = searchedCity;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let mainCity = document.querySelector("#main-city");
  let searchedCity = inputCity.value;
  mainCity.innerHTML = searchedCity;

  searchCity(inputCity.value);
}
let button = document.querySelector("button");
button.addEventListener("click", changeCity);

//fahrenheit and celcius switch
/*let fahrenheit = document.querySelector("#fahrenheit");
let celcius = document.querySelector("#celcius");
let mainTemp = document.querySelector("#main-temp");
function changeToFahrenheit() {
  mainTemp.innerHTML = "83˚";
}
function changeToCelcius() {
  mainTemp.innerHTML = "28˚";
}
fahrenheit.addEventListener("click", changeToFahrenheit);
celcius.addEventListener("click", changeToCelcius);*/

//GPS weather button
function showWeather(response) {
  console.log(response.data);

  let mainCity = document.querySelector("#main-city");
  let mainTemp = document.querySelector("#main-temp");
  let humidity = document.querySelector("#humidity");

  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidityPercent = response.data.main.humidity;

  mainCity.innerHTML = `${city}`;
  mainTemp.innerHTML = `${temperature}˚`;
  humidity.innerHTML = `${humidityPercent}`;
}

function retrievePosition(position) {
  let apiKey = "6ad2af0e6e1670b40ddda4b103040cf3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function accessUrl() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let gpsButton = document.querySelector(".gps-button");
gpsButton.addEventListener("click", accessUrl);
