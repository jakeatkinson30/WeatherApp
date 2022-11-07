// Prevnent page reloading and grab value from search field
const form = document.querySelector(".app-wrapp form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;
});

// Check if items exist
const apiKey = "ff9ae19c1f0b0f573bf9c37cf17ba447";
const inputVal = input.value;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(data => {

    })
    .catch(() => {msg.textContent = "Please enter a valid city.."});
