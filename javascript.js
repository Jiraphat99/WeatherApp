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
  const form = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const alert = document.getElementById("alert");
  const currentCity = document.getElementById("current-city");
  const currentDate = document.getElementById("current-date");
  const weatherIcon = document.getElementById("weather-icon");
  const currentTemperature = document.getElementById("currentTemperature");
  const currentSky = document.getElementById("currentSky");
  const currentCountry = document.getElementById("currentCountry");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const rainy = document.getElementById("rainy");
  const weatherApp = document.querySelector(".weatherApp");
  const defaultInfo = document.querySelector(".currentCity-section");
  const dayInfo = document.querySelector(".day_info");
  const listContent = document.querySelector(".list_content");

  const apiKey = "097tobe889c8b3ef74487a6e720a70b1";

  // Hide weather information elements initially
  weatherApp.style.visibility = "visible";
  defaultInfo.classList.add("hidden");
  dayInfo.classList.add("hidden");
  listContent.classList.add("hidden");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
      getWeatherByCity(city);
    }
  });

  function getWeatherByCity(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        updateWeatherInfo(response.data);
        alert.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        alert.textContent = "Location not found. Please try again.";
        alert.style.display = "block";
        hideWeatherInfo();
      });
  }

  function getWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        updateWeatherInfo(response.data);
        alert.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        alert.textContent =
          "Unable to retrieve weather data. Please search for your city manually.";
        alert.style.display = "block";
        hideWeatherInfo();
      });
  }

  function updateWeatherInfo(data) {
    currentCity.textContent = data.city;
    currentCountry.textContent = data.country;
    currentDate.textContent = new Date().toLocaleString();
    weatherIcon.src = data.condition.icon_url;
    currentTemperature.textContent = `${Math.round(
      data.temperature.current
    )}°C`;
    currentSky.textContent = data.condition.description;
    humidity.textContent = `${data.temperature.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} Km/h`;
    rainy.textContent = `${data.temperature.feels_like}%`; // Assuming rainy value needs to be updated

    // Show weather information elements
    defaultInfo.classList.remove("hidden");
    dayInfo.classList.remove("hidden");
    listContent.classList.remove("hidden");
  }

  function hideWeatherInfo() {
    // Hide weather information elements
    defaultInfo.classList.add("hidden");
    dayInfo.classList.add("hidden");
    listContent.classList.add("hidden");
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
          alert.textContent =
            "Location access denied. Please search for your city manually.";
          alert.style.display = "block";
          hideWeatherInfo();
        }
      );
    } else {
      alert.textContent =
        "Geolocation not supported. Please search for your city manually.";
      alert.style.display = "block";
      hideWeatherInfo();
    }
  }

  // Fetch weather data based on user's location when the page loads
  getUserLocation();
});
