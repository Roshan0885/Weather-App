function fetchWeather(city = "Delhi") {
  const url = `/weather?city=${encodeURIComponent(city)}`;

 fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      document.getElementById("location").textContent = data.name;
      document.getElementById("weather").textContent = data.weather[0].description;
      document.getElementById("temp").textContent = Math.round(data.main.temp);
      document.getElementById("humidity").textContent = data.main.humidity + "%";
      document.getElementById("wind").textContent = data.wind.speed + " m/s";
      document.getElementById("icon").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
    .catch(err => {
      alert("Error fetching weather");
      console.error(err);
    });
}

document.querySelector(".refresh").addEventListener("click", () => {
  const city = prompt("Enter city name:");
  if (city && city.trim().length > 2) {
    fetchWeather(city.trim());
  }
});

fetchWeather();
