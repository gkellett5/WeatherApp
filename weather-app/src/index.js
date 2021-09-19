function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
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
    if (index < 6) {
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
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
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

function displayTemperature(response) {
    let city = response.data.name;
    let cityCurrent = document.querySelector("#city-name");
    cityCurrent.innerHTML = city;

    let temp = response.data.main.temp;
    let tempToday = document.querySelector(".temperature-today");
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
    humidityToday.innerHTML = humidity;

    let wind = response.data.wind.speed;
    let windToday = document.querySelector("#wind");
    windToday.innerHTML = wind;

    let icon = response.data.weather[0].icon;
    let iconToday = document.querySelector("#icon");
    iconToday.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );

    let currentTime = document.querySelector(#current-time);
    currentTime.innerHTML = formatDate
    
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "49bbaac1dc8915028fbb18c9703f77a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "49bbaac1dc8915028fbb18c9703f77a7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  navigator.geolocation.getCurrentPosition(currentPosition);
  axios.get(apiURL).then(search(currentPosition));
}

  function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("search-input");
  let cityName = document.querySelector("#city-name");
  let searchCity = searchInput.value;

  cityName.innerHTML = searchCity;
  if (searchCity) {
  } else {
    cityName.innerHTML = null;
    alert("Please search for a City");

    search(searchCity);
  }

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchForm);
