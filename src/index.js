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
    return (
      `${day} ${month} ` +
      today.getDate() +
      `, ` +
      today.getFullYear() +
      " " +
      today.getHours() +
      `:` +
      today.getMinutes()
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
  function newFahrenheit() {
    let fahLink = document.querySelector("#main-temp");
    fahLink.innerHTML = 71;
  }
  
  let changeFahrenheit = document.querySelector("#fahrenheit");
  changeFahrenheit.addEventListener("click", newFahrenheit);
  
  function newCelsius() {
    let celLink = document.querySelector("#main-temp");
    celLink.innerHTML = 21;
  }
  
  let changeCelsius = document.querySelector("#celsius");
  changeCelsius.addEventListener("click", newCelsius);
  
  //Week 5 Homework
  function displayNewWeatherCondition(response) {
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temperate").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  function showCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=72bb9dab46b9ec3d65f423c63f27a9b8&units=imperial`;
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
  currentButton.addEventListener("submit", getLocation);
  
  function newResult(event) {
    event.preventDefault();
    let city = document.querySelector("#cityInput").value;
    searchedCity(city);
  }
  
  let searchResult = document.querySelector("#search-bar");
  searchResult.addEventListener("submit", newResult);
  
  searchedCity("Los Angeles");
  