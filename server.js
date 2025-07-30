const express = require("express");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


if (!process.env.API_KEY) {
  console.error(" API_KEY is missing in .env file");
  process.exit(1);
}


app.use(express.static(path.join(__dirname, "Public")));


app.get("/weather", async (req, res) => {
  const city = req.query.city || "Delhi";
  const apiKey = process.env.API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch weather data from API" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public'));
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



 
