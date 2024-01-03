const api = {
  key: "c3c4cbda6dcb01a608863ededc89d630",
  base: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.getElementById("search-box");
const button = document.getElementById("button");

searchbox.addEventListener("keypress", function (evt) {
  if (evt.key === "Enter") {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
});
button.addEventListener("click", function () {
  getResults(searchbox.value);
  console.log(searchbox.value);
});

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;
  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
  setBackgroundImage(weather.main.temp);
}
function setBackgroundImage(temperature) {
  let backgroundImageUrl = "";
  if (temperature < 0) {
    backgroundImageUrl = "url('./bg2.jpg')";
  } else if (temperature > 10) {
    backgroundImageUrl = "url('./bg3.jpg')";
  } else {
    backgroundImageUrl = "url('./bg.jpg')";
  }
  document.body.style.backgroundImage = backgroundImageUrl;
}

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
