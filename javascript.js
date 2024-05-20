function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let alertElement = document.getElementById("alert");

  if (response.data && response.data.city) {
    let temperature = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    alertElement.style.display = "none"; // Hide alert if location is found
  } else {
    showAlert();
  }
  hideLoadingScreen(); // Hide the loading screen once data is loaded
}

function showAlert() {
  let alertElement = document.getElementById("alert");
  alertElement.style.display = "block";
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  showLoadingScreen(); // Show the loading screen before fetching data
  axios.get(apiUrl).then(displayTemperature).catch(showAlert);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayOfMonth = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let dayOfWeek = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

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
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedMonth = months[month];
  let formattedDayOfWeek = days[dayOfWeek];
  return `${formattedDayOfWeek}, ${dayOfMonth} ${formattedMonth} ${year} ${hours}:${minutes} ${period}`;
}

function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "flex";
  document.querySelector(".weather-app").style.display = "none";
}

function hideLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
  document.querySelector(".weather-app").style.display = "block";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

// Initial loading screen display
showLoadingScreen();
axios
  .get(
    `https://api.shecodes.io/weather/v1/current?query=Amsterdam&key=b2a5adcct04b33178913oc335f405433&units=metric`
  )
  .then(displayTemperature)
  .catch(showAlert);
