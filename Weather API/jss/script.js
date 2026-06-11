const apiKey = "b348b7cf86a9be27becabd4196036626";

window.onload = () => {
    getWeather("Surat");
};

async function getWeather(defaultCity = null) {

    const city = defaultCity || document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const weatherContainer = document.getElementById("weatherContainer");

        const card = document.createElement("div");

        card.classList.add("weather-card");

        card.innerHTML = `
      <h2>${data.name}</h2>

      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

      <h1>${data.main.temp}°C</h1>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} km/h</p>
      <p>Feels Like: ${data.main.feels_like}°C</p>
    `;

        weatherContainer.appendChild(card);
        document.getElementById("cityInput").value = "";

    } catch (error) {

        document.getElementById("errorMsg").innerText = error.message;
    }
}