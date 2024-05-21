function displayTemperature(response) {
  console.log(response.data); // Log the response data to inspect it

  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let skyElement = document.querySelector("#currentSky");
  let weatherIconElement = document.querySelector("#weather-icon");

  if (response.data && response.data.city_name) {
    let temperature = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.city_name; // Update city name here
    temperatureElement.innerHTML = `${temperature}°C`;
    skyElement.innerHTML = response.data.weather[0].description;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
  }
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "097tobe889c8b3ef74487a6e720a70b1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  showLoadingScreen();
  axios
    .get(apiUrl)
    .then((response) => {
      hideLoadingScreen();
      displayTemperature(response);
    })
    .catch(() => {
      hideLoadingScreen();
      showAlert();
    });
}

document.querySelector("#search-form").addEventListener("submit", search);

function updateDateTime() {
  let currentDateElement = document.querySelector("#current-date");
  let currentDayElement = document.querySelector("#currentDayoftheWeek");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  currentDayElement.innerHTML = days[currentDate.getDay()];
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
