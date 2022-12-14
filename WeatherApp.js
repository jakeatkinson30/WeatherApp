const api = {
    key: "ff9ae19c1f0b0f573bf9c37cf17ba447",
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector(".searchBox");
searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
    if(e.code === 'Enter') {
        e.preventDefault();
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector(".place .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".place .todaysDate");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".forecast .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".forecast .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hiLow");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
