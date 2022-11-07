const api = {
    key: "ff9ae19c1f0b0f573bf9c37cf17ba447",
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(any) {
    if(any.keyCode == 13) {
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





// window.addEventListener("load", () => {
//     let lat;
//     let long;

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//              long = position.coords.longitude;
//              lat = position.coords.latitude;
//              const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

//              fetch(base).then((response) => {
//                     return response.json();
//                 }).then((data) => {
//                     const { temp } = data.main;
//                     const place = data.main;
//                     const { description, icon } = data.weather[0];
//                     const { sunrise, sunset } = data.sys;

//                     const fahrenheit = (temp * 9) / 5 + 32;

//                     const sunriseGMT = new Date(sunrise * 1000);
//                     const sunsetGMT = new Date(sunset * 1000);
//                 });
//         });
//     }
// })