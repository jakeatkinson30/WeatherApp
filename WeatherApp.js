const api = {
    key: "ff9ae19c1f0b0f573bf9c37cf17ba447",
    base: "https://api.openweathermap.org/data/2.5/"
  };
  
  const searchbox = document.querySelector(".searchBox");
  searchbox.addEventListener("keypress", setQuery);
  
  function setQuery(e) {
    if (e.code === "Enter") {
      e.preventDefault();
      getResults(searchbox.value);
    }
  }
  
  async function getResults(query) {
    try {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      const weather = await response.json();
      displayResults(weather);
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve weather data.");
    }
  }
  
  function displayResults(weather) {
    const city = document.querySelector(".place .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    const now = new Date();
    const date = document.querySelector(".place .todaysDate");
    date.innerText = dateBuilder(now);
  
    const temp = document.querySelector(".forecast .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
    const weather_el = document.querySelector(".forecast .weather");
    weather_el.innerText = weather.weather[0].main;
  
    const hilow = document.querySelector(".hiLow");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;
  }
  
  function dateBuilder(d) {
    const months = [
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
      "December"
    ];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  
