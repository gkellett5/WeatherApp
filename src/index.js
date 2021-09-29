function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[day]} ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
  let temp = response.data.main.temp;
  let tempElement = document.querySelector("#temp-current");
  tempElement.innerHTML = Math.round(temp);

  let tempHigh = response.data.main.temp_max;
  let tempHighElement = document.querySelector("#high");
  tempHighElement.innerHTML = Math.round(tempHigh);

  let tempLow = response.data.main.temp_min;
  let tempLowElement = document.querySelector("#low");
  tempLowElement.innerHTML = Math.round(tempLow);

  let tempFeelsLike = response.data.main.feels_like;
  let tempFeelsLikeElement = document.querySelector("#feels-like");
  tempFeelsLikeElement.innerHTML = Math.round(tempFeelsLike);

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(humidity);

  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(wind);

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  let date = formatDate(response.data.dt);
  let dateElement = document.querySelector("#current-time");
  dateElement.innerHTML = `Updated ${date}`;

  let city = response.data.name;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = city;

  getForecast(response.data.coord);
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
          width="75"
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
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

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(displayTemp);
}

function getLocation(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemp);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let unit = "metric";

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchForm);

navigator.geolocation.getCurrentPosition(getLocation);
