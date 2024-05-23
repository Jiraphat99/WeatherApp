function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let amPM = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[date.getDay()];
  let formattedMonth = months[date.getMonth()];

  return `${formattedDay}, ${day} ${formattedMonth} ${year} ${hours}:${minutes} ${amPM}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "097tobe889c8b3ef74487a6e720a70b1";

  // DOM Elements
  const elements = {
    form: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
    alert: document.getElementById("alert"),
    currentCity: document.getElementById("current-city"),
    currentDate: document.getElementById("current-date"),
    weatherIcon: document.getElementById("weather-icon"),
    currentTemperature: document.getElementById("currentTemperature"),
    currentSky: document.getElementById("currentSky"),
    currentCountry: document.getElementById("currentCountry"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("wind-speed"),
    feelLike: document.getElementById("feelLike"),
    weatherApp: document.querySelector(".weatherApp"),
    defaultInfo: document.querySelector(".currentCity-section"),
    dayInfo: document.querySelector(".day_info"),
    listContent: document.querySelector(".list_content"),
  };

  // Initialize UI
  initializeUI();

  // Event Listeners
  elements.form.addEventListener("submit", handleFormSubmit);

  // Functions
  function initializeUI() {
    elements.weatherApp.style.visibility = "visible";
    hideWeatherInfo();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const city = elements.searchInput.value.trim();
    if (city) {
      getWeatherByCity(city);
    }
  }

  function getWeatherByCity(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        updateWeatherInfo(response.data);
        elements.alert.style.display = "none";
        elements.weatherApp.classList.remove("centered"); // Remove centered class on success
      })
      .catch((error) => {
        console.error(error);
        showAlert("Location not found. Please try again.");
        hideWeatherInfo();
        elements.weatherApp.classList.add("centered"); // Add centered class on error
      });
  }

  function getWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        updateWeatherInfo(response.data);
        elements.alert.style.display = "none";
        elements.weatherApp.classList.remove("centered"); // Remove centered class on success
      })
      .catch((error) => {
        console.error(error);
        showAlert(
          "Unable to retrieve weather data. Please search for your city manually."
        );
        hideWeatherInfo();
        elements.weatherApp.classList.add("centered"); // Add centered class on error
      });
  }

  function updateWeatherInfo(data) {
    elements.currentCity.textContent = data.city;
    elements.currentCountry.textContent = data.country;
    elements.currentDate.textContent = new Date().toLocaleString();
    elements.weatherIcon.src = data.condition.icon_url;
    elements.currentTemperature.textContent = `${Math.round(
      data.temperature.current
    )}°C`;
    elements.currentSky.textContent = data.condition.description;
    elements.humidity.textContent = `${data.temperature.humidity}%`;
    elements.windSpeed.textContent = `${data.wind.speed} Km/h`;
    elements.feelLike.textContent = `${Math.round(
      data.temperature.feels_like
    )}°C`;

    showWeatherInfo();
  }

  function showWeatherInfo() {
    elements.defaultInfo.classList.remove("hidden");
    elements.dayInfo.classList.remove("hidden");
    elements.listContent.classList.remove("hidden");
  }

  function hideWeatherInfo() {
    elements.defaultInfo.classList.add("hidden");
    elements.dayInfo.classList.add("hidden");
    elements.listContent.classList.add("hidden");
  }

  function showAlert(message) {
    elements.alert.textContent = message;
    elements.alert.style.display = "block";
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeatherByCoords(lat, lon);
        },
        (error) => {
          console.error(error);
          showAlert(
            "Location access denied. Please search for your city manually."
          );
          hideWeatherInfo();
          elements.weatherApp.classList.add("centered"); // Add centered class on location denied
        }
      );
    } else {
      showAlert(
        "Geolocation not supported. Please search for your city manually."
      );
      hideWeatherInfo();
      elements.weatherApp.classList.add("centered"); // Add centered class if geolocation not supported
    }
  }

  // Fetch weather data based on user's location when the page loads
  getUserLocation();
});
