var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var body = document.getElementById("body");
var city = document.querySelector(".city");
var temperature = document.querySelector(".temperature");
var feelsLike = document.querySelector(".feelsLike");
var tempMin = document.querySelector(".tempMin");
var tempMax = document.querySelector(".tempMax");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var weather = document.querySelector(".weather");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var regionNames = new Intl.DisplayNames(["en"], { type: "region" });
searchBtn.addEventListener("click", function () {
  getWeatherData(searchInput.value);
});
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeatherData(searchInput.value);
  }
});
function getWeatherData(location) {
  return __awaiter(this, void 0, void 0, function () {
    var url, response, weatherData;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            location +
            "&units=metric&APPID=c08a98a760ecba22dc8ce052811b895e";
          return [4 /*yield*/, fetch(url, { mode: "cors" })];
        case 1:
          response = _a.sent();
          return [4 /*yield*/, response.json()];
        case 2:
          weatherData = _a.sent();
          displayData(weatherData);
          return [2 /*return*/];
      }
    });
  });
}
function displayData(data) {
  city.innerText = data.name + ", " + regionNames.of(data.sys.country);
  temperature.innerText = Math.round(data.main.temp) + " °C";
  feelsLike.innerText = Math.round(data.main.feels_like) + " \u00B0C";
  tempMin.innerText = Math.round(data.main.temp_min) + " \u00B0C";
  tempMax.innerText = Math.round(data.main.temp_max) + " \u00B0C";
  humidity.innerText = Math.round(data.main.humidity) + " %";
  wind.innerText = Math.round(data.wind.speed * 3.6) + " km/h";
  weather.innerText = beutifyString(data.weather[0].description);
  backgroundSelecter(data.weather[0].main);
}
function backgroundSelecter(weatherMain) {
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
function bodyBackgroundChanger(weather) {
  body.style.backgroundImage = "url(../images/" + weather + ".jpg)";
}
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
function beutifyString(string) {
  var words = string.split(" ");
  words.forEach(function (word, index) {
    words[index] = capitalizeFirstLetter(word);
  });
  return words.join(" ");
}
getWeatherData("istanbul");
