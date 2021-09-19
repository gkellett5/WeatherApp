function displayTemp(response) {
  let temp = response.data.main.temp;
  let tempToday = document.querySelector("#temp-current");
  tempToday.innerHTML = Math.round(temp);

  let tempHigh = response.data.main.temp_max;
  let tempHighToday = document.querySelector("#high");
  tempHighToday.innerHTML = Math.round(tempHigh);

  let tempLow = response.data.main.temp_min;
  let tempLowToday = document.querySelector("#low");
  tempLowToday.innerHTML = Math.round(tempLow);

  let description = response.data.weather[0].description;
  let descriptionToday = document.querySelector("#description");
  descriptionToday.innerHTML = description;

  let humidity = response.data.main.humidity;
  let humidityToday = document.querySelector("#humidity");
  humidityToday.innerHTML = Math.round(humidity);

  let wind = response.data.wind.speed;
  let windToday = document.querySelector("#wind");
  windToday.innerHTML = Math.round(wind);

  let icon = response.data.weather[0].icon;
  let iconToday = document.querySelector("#icon");
  iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  let searchCity = searchInput.value;

  cityName.innerHTML = searchCity;
  if (searchCity) {
  } else {
    cityName.innerHTML = null;
    alert("Please search for a City");
  }

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index !== 0) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="60"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span> | <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "49bbaac1dc8915028fbb18c9703f77a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let apiKey = "49bbaac1dc8915028fbb18c9703f77a7";

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchForm);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = `${day} ${hours}:${minutes}`;

let h5 = document.querySelector("#current-time");
h5.innerHTML = `Updated ${currentTime}`;
