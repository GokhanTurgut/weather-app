const body = document.getElementById("body");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feelsLike");
const tempMin = document.querySelector(".tempMin");
const tempMax = document.querySelector(".tempMax");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

searchBtn.addEventListener("click", () => {
  getWeatherData(searchInput.value);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherData(searchInput.value);
  }
});

async function getWeatherData(location: string) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=c08a98a760ecba22dc8ce052811b895e`;
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
  displayData(weatherData);
}

function displayData(data: object) {
  city.innerText = `${data.name}, ${regionNames.of(data.sys.country)}`;
  temperature.innerText = Math.round(data.main.temp) + " °C";
  feelsLike.innerText = `${Math.round(data.main.feels_like)} °C`;
  tempMin.innerText = `${Math.round(data.main.temp_min)} °C`;
  tempMax.innerText = `${Math.round(data.main.temp_max)} °C`;
  humidity.innerText = `${Math.round(data.main.humidity)} %`;
  wind.innerText = `${Math.round(data.wind.speed * 3.6)} km/h`;
  weather.innerText = beutifyString(data.weather[0].description);
  backgroundSelecter(data.weather[0].main);
}

function backgroundSelecter(weatherMain: string) {
  switch (weatherMain) {
    case "Thunderstorm":
      bodyBackgroundChanger("thunderstorm");
      break;

    case "Drizzle":
      bodyBackgroundChanger("drizzle");
      break;

    case "Rain":
      bodyBackgroundChanger("rain");
      break;

    case "Snow":
      bodyBackgroundChanger("snow");
      break;

    case "Clear":
      bodyBackgroundChanger("clear");
      break;

    case "Clouds":
      bodyBackgroundChanger("clouds");
      break;

    default:
      bodyBackgroundChanger("night");
      break;
  }
}

function bodyBackgroundChanger(weather: string) {
  body.style.backgroundImage = `url(./images/${weather}.jpg)`;
}

function capitalizeFirstLetter(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

function beutifyString(string: string) {
  let words = string.split(" ");
  words.forEach((word, index) => {
    words[index] = capitalizeFirstLetter(word);
  });
  return words.join(" ");
}

getWeatherData("istanbul");
