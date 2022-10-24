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
  //
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
  let celsiusTemperature = null;
  let changeCelsius = document.querySelector("#celsius");
  changeCelsius.addEventListener("click", newCelsius);
  
  //Week 5 Homework
  function displayNewWeatherCondition(response) {
    let temperature = document.querySelector("#main-temp");
    let city = document.querySelector("#current-city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    
    fahrenheitTemperature = response.data.main.temp;

    temperature.innerHTML = Math.round(fahrenheitTemperature);
    city.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    console.log(response);
  }
  function showCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=72bb9dab46b9ec3d65f423c63f27a9b8&units=imperial`;
    let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
    axios.get(apiUrl).then(displayNewWeatherCondition);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }
  
  function searchedCity(city) {
    let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=72bb9dab46b9ec3d65f423c63f27a9b8&units=imperial`;
    axios.get(apiUrl).then(displayNewWeatherCondition);
  }
  
  let currentButton = document.querySelector("#current-location");
  currentButton.addEventListener("click", getLocation);
  
  function newResult(event) {
    event.preventDefault();
    let city = document.querySelector("#cityInput").value;
    searchedCity(city);
  }
  
  let searchResult = document.querySelector("#search-bar");
  searchResult.addEventListener("submit", newResult);
  
  searchedCity("Los Angeles");
  