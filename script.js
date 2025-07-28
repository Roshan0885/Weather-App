const API_KEY = "";

  function fetchWeather(city = "Delhi") {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          alert("City not found. Please enter a valid city name.");
          return;
        }

        // Show weather data only if valid city
        document.getElementById("location").textContent = data.name;
        document.getElementById("weather").textContent = data.weather[0].description;
        document.getElementById("temp").textContent = Math.round(data.main.temp);
        document.getElementById("humidity").textContent = data.main.humidity + " %";
        document.getElementById("wind").textContent = data.wind.speed + " m/s";
        document.getElementById("icon").src =
          `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      })
      .catch((error) => {
        alert("Error fetching weather data.");
        console.error(error);
      });
  }

  // Refresh button to enter new city name
  document.querySelector(".refresh").addEventListener("click", () => {
    const city = prompt("Enter city name:");
    if (city && city.trim().length > 2) {
      fetchWeather(city.trim());
    } else {
      alert("Please enter a valid city name.");
    }
  });

  // Load default city on page load
  fetchWeather();

