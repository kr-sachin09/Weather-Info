document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const searchBtn = document.getElementById("get-btn");
  const info = document.getElementById("result-section");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("weather");
  const description = document.getElementById("description");

  // Renamed from 'error' to 'errorMsg' to avoid conflicts with JS Error keywords
  const errorMsg = document.getElementById("error");

  const API_KEY = "06d8fac032d183280e2828a005b9592d";

  searchBtn.addEventListener("click", async () => {
    const city = input.value.trim();
    if (!city) return;

    try {
      // Fix 1: Pass the string value, not the DOM element
      const fetchedData = await fetchData(city);
      displayData(fetchedData);
    } catch (err) {
      showError();
    }
  });

  async function fetchData(cityName) {
    // Fix 2: Updated endpoint to fetch by city name and return Celsius
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    // Fix 3 & 4: Check response.ok and use capital 'E' for Error
    if (!response.ok) {
      throw new Error("City not found");
    }

    const ftweather = await response.json();
    return ftweather;
  }

  function displayData(data) {
    const { name, main, weather } = data;
    cityName.textContent = name;
    temperature.textContent = `Temp : ${main.temp}°C`;
    description.textContent = `Info : ${weather[0].description}`;

    info.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    // Fix 5: Hide info, show error
    info.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
