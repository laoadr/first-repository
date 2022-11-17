function newDate() {
    let today = new Date();
    console.log(today);
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return (
      `${day} ${month} ` +
      today.getDate() +
      `, ` +
      today.getFullYear() +
      " " +
      today.getHours() +
      `:${minutes}`
    );
  }
  
  let h1 = document.querySelector("h1");
  h1.innerHTML = newDate();
  
  //Week 8

function displayForecast() {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"> row-cols-7`;

  forecast.forEach(function(forecastDay, index) {
    if (index<6) {
      forecastHTML = forecastHTML + `<div class = "col">
      <div class = "forecast day">
      <div class = "weather-forecast-date">${formatDay(
        forecastDay.dt
      )}</div>
      <img src = "https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="42"
    />
    <div class = "weather-forecast-temperatures">
      <span class = "weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}° | </span>
      <span class = "weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}° | </span>
      </div>
      </div>
      </div>`                                  
    }
  });
  
//   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   days.forEach(function (day) {
//     forecastHTML = forecastHTML + `
//     <div class="col-2">
//    <div class="weather-forecast-date">${day}</div>
//    <img src="htp://openweathermap.org/img/wn/50d@2px.png" alt="" width="42"/>
//    <div class="weather-forecast-temperature">
//    <span class="temperature-max" id="forecastTempMax">
//  18°</span>
//    <span class="temperature-min" id="forecastTempMin">
//  17°
//    </span>
//    </div>
//    </div>
//    `;
//   })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

  function newCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#cityInput".value);
  }
  
  let submitButton = document.querySelector("#search-bar");
  submitButton.addEventListener("submit", newCity);
  //
  function newFahrenheit(event) {
    event.preventDefault();
    let fahLink = document.querySelector("#main-temp");
    fahLink.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  let changeFahrenheit = document.querySelector("#fahrenheit");
  changeFahrenheit.addEventListener("click", newFahrenheit);

  
  function newCelsius(event) {
    event.preventDefault();
    celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
    let celLink = document.querySelector("#main-temp");
    celLink.innerHTML = Math.round(celsiusTemperature);
  }
  let fahrenheitTemperature = null;
  let changeCelsius = document.querySelector("#celsius");
  changeCelsius.addEventListener("click", newCelsius);
  
  function displayNewWeatherCondition(response) {
    fahrenheitTemperature = response.data.main.temp;
  
    document.querySelector("#main-temp").innerHTML = Math.round(fahrenheitTemperature);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#city").innerHTML = `${response.data.name}`;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }
  function showCurrentLocation(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=72bb9dab46b9ec3d65f423c63f27a9b8&units=imperial`;
    axios.get(apiUrl).then(displayNewWeatherCondition);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }
  
  function searchedCity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72bb9dab46b9ec3d65f423c63f27a9b8&units=imperial`;
    axios.get(apiUrl).then(displayNewWeatherCondition);
  }
  
  // let currentButton = document.querySelector("#current-location");
  // currentButton.addEventListener("click", getLocation);
  
  function newResult(event) {
    event.preventDefault();
    let city = document.querySelector("#cityInput").value;
    searchedCity(city);
  }
  
  let searchResult = document.querySelector("#search-bar");
  searchResult.addEventListener("submit", newResult);
  
  searchedCity("Los Angeles");
  displayForecast();