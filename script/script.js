const apiKey = "ba71f186309e4d93b5e4fb18dd830016";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const search = document.querySelector("#search");
const btn = document.querySelector("#btn_search");

async function getWeather(name) {
    const response = await fetch(apiUrl + name + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);


    document.querySelector(".city").innerText = data.city.name;
    document.querySelector(".temp").innerText = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.list[0].main.humidity + " %";
    document.querySelector(".wind").innerText = data.list[0].wind.speed + " km/h";

    const weatherMain = data.list[0].weather[0].main;
    const weatherImg = document.querySelector(".weather");

    if (weatherMain == "Clouds") {
        weatherImg.src = "/assets/icon/animated/cloudy-day-1.svg";
    } else if (weatherMain == "Clear") {
        weatherImg.src = "/assets/icon/animated/day.svg";
    } else if (weatherMain == "Rain") {
        weatherImg.src = "/assets/icon/animated/rainy-1.svg";
    } else if (weatherMain == "Snow") {
        weatherImg.src = "/assets/icon/animated/snowy-1.svg";
    } else if (weatherMain == "Thunderstorm") {
        weatherImg.src = "/assets/icon/animated/thunder.svg";
    } else {
        weatherImg.src = "/assets/icon/animated/cloudy-day-1.svg";
    }

    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    for (let i = 1; i <= 4; i++) {
        const dayIndex = i * 8;
        const dayData = data.list[dayIndex];
        const nightData = data.list[dayIndex + 4];
        const dayWeatherMain = dayData.weather[0].main;
        const nightWeatherMain = nightData.weather[0].main;
        let dayWeatherIcon, nightWeatherIcon;

        if (dayWeatherMain == "Clouds") {
            dayWeatherIcon = "/assets/icon/animated/cloudy-day-1.svg";
        } else if (dayWeatherMain == "Clear") {
            dayWeatherIcon = "/assets/icon/animated/day.svg";
        } else if (dayWeatherMain == "Rain") {
            dayWeatherIcon = "/assets/icon/animated/rainy-1.svg";
        } else if (dayWeatherMain == "Snow") {
            dayWeatherIcon = "/assets/icon/animated/snowy-1.svg";
        } else if (dayWeatherMain == "Thunderstorm") {
            dayWeatherIcon = "/assets/icon/animated/thunder.svg";
        } else {
            dayWeatherIcon = "/assets/icon/animated/cloudy-day-1.svg";
        }

        if (nightWeatherMain == "Clouds") {
            nightWeatherIcon = "/assets/icon/animated/cloudy-night-1.svg";
        } else if (nightWeatherMain == "Clear") {
            nightWeatherIcon = "/assets/icon/animated/night.svg";
        } else if (nightWeatherMain == "Rain") {
            nightWeatherIcon = "/assets/icon/animated/rainy-6.svg";
        } else if (nightWeatherMain == "Snow") {
            nightWeatherIcon = "/assets/icon/animated/snowy-6.svg";
        } else if (nightWeatherMain == "Thunderstorm") {
            nightWeatherIcon = "/assets/icon/animated/thunder.svg";
        } else {
            nightWeatherIcon = "/assets/icon/animated/cloudy-night-1.svg";
        }

        const date = new Date(dayData.dt_txt);
        const dayName = daysOfWeek[date.getDay()];

        const cardHTML = `
            <div class="col-md-3">
                <div class="weather-card">
                    <div class="header">
                        <h2 class="days">${dayName}</h2>
                        <img src="${dayWeatherIcon}" alt="Day Weather Icon">
                    </div>
                    <p class="temp">Température Jour: ${Math.round(dayData.main.temp)}°C</p>
                    <p class="vent">Vent Jour: ${dayData.wind.speed} km/h</p>
                    <p class="humidity">Humidité Jour: ${dayData.main.humidity} %</p>
                    <div class="header">
                        <img src="${nightWeatherIcon}" alt="Night Weather Icon">
                    </div>
                    <p class="temp">Température Nuit: ${Math.round(nightData.main.temp)}°C</p>
                    <p class="vent">Vent Nuit: ${nightData.wind.speed} km/h</p>
                    <p class="humidity">Humidité Nuit: ${nightData.main.humidity} %</p>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    }
}

btn.addEventListener("click", function(event) {
    event.preventDefault();
    getWeather(search.value);
});