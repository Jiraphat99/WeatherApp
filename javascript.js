// Function to format the date
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

// Function to fetch city weather information
function fetchCityWeather(city) {
  const apiKey = "097tobe889c8b3ef74487a6e720a70b1";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const weatherData = response.data;
      updateWeatherDetails(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      // Show alert if no location is found
      alert("No location found. Please try again. 🐾");
      // Reset all information to default
      resetWeatherDetails();
    });
}

// Function to update weather details on the page
function updateWeatherDetails(data) {
  console.log(data); // Log the data object to the console
  document.getElementById("current-city").textContent = data.city;
  document.getElementById("currentCountry").textContent = data.country;
  document.getElementById("wind-speed").textContent = `${Math.round(
    data.wind.speed
  )} Km/h`;
  document.getElementById("currentTemperature").textContent = Math.round(
    data.temperature.current
  );
  document.getElementById("humidity").textContent = `${Math.round(
    data.temperature.humidity
  )}%`;
  document.getElementById("feelLike-value").textContent = Math.round(
    data.temperature.feels_like
  );
  document.getElementById("currentSky").textContent =
    data.condition.description;

  // Update weather icon based on condition
  let weatherIcon = "";
  const description = data.condition.description.toLowerCase(); // Convert to lowercase for case-insensitive matching
  if (description.includes("clear sky")) {
    weatherIcon = "Warm-clearSky.png";
  } else if (description.includes("cloud")) {
    weatherIcon = "cloudy-day.png";
  } else if (description.includes("shower rain")) {
    weatherIcon = "Shower rain.png";
  } else if (description.includes("rain")) {
    weatherIcon = "Rain.png";
  } else if (description.includes("thunderstorm")) {
    weatherIcon = "thunderstorm.png";
  } else if (description.includes("snow")) {
    weatherIcon = "Snow.png";
  } else if (description.includes("mist")) {
    weatherIcon = "Mist.png";
  } else {
    weatherIcon = "default.png";
  }

  // Set the src attribute of the weather icon
  document.getElementById("weather-icon").src = `src/image/${weatherIcon}`;
}

// Function to reset weather details to default
function resetWeatherDetails() {
  document.getElementById("current-city").textContent = "Unknown";
  document.getElementById("currentCountry").textContent = "Unknown";
  document.getElementById("wind-speed").textContent = "0 Km/h";
  document.getElementById("currentTemperature").textContent = "0";
  document.getElementById("humidity").textContent = "0%";
  document.getElementById("feelLike-value").textContent = "0";
  document.getElementById("currentSky").textContent = "Unknown";

  // Reset weather icon to default
  document.getElementById("weather-icon").src = "src/image/404 Not Found.png";
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  // Get the current date
  const currentDate = new Date();

  // Call the formatDate function to format the date
  const formattedDate = formatDate(currentDate);

  // Get the element with the class current-date
  const currentDateElement = document.querySelector(".current-date");

  // Set the formatted date as the content of the current-date element
  currentDateElement.textContent = formattedDate;

  // Add event listener to the form for city search
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const userInput = document.getElementById("search-input").value;
    fetchCityWeather(userInput);
  });
});
