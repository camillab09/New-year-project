const api = {
  key: "c3c4cbda6dcb01a608863ededc89d630",
  base: "http://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.key === "Enter") {
    getResults(searchbox.value);
    getTemp(searchbox.value);
    console.log(searchbox.value);
  }
}
function getTemp(queryTemp) {
  fetch(`${api.base}weather?q=${queryTemp}&units=metric&APPID=${api.key}`)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp;
      document.getElementById("temperature").textContent = temp;
    })
    .then(background);
}
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
}

function background(data) {
  if (data < 10) {
    document.body.style.backgroundImage = "url(./bg2.jpg)";
  } else if (data > 0) {
    document.body.style.backgroundImage = "url(./bg2.jpg)";
  } else {
    document.body.style.backgroundImage = "url(./bg.jpg)";
  }
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
