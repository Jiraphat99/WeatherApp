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
    });
}

// Function to update weather details on the page
function updateWeatherDetails(data) {
  console.log(data); // Log the data object to the console
  document.getElementById("current-city").textContent = data.city;
  document.getElementById("currentCountry").textContent = data.country;
  document.getElementById("wind-speed").textContent =
    data.temperature.wind.speed;
  // document.getElementById("currentTemperature").textContent = data.temperature.current;
  // document.getElementById("humidity").textContent = data.temperature.humidity;
  // document.getElementById("feelLike-value").textContent = data.temperature.feels_like;
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
