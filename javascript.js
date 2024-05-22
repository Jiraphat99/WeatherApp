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

  const apiKey = "097tobe889c8b3ef74487a6e720a70b1";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
      getWeather(city);
    }
  });

  function getWeather(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        updateWeatherInfo(response.data);
        alert.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        alert.style.display = "block";
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
  }
});
