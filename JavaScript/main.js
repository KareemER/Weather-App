let weatherData ;
let weatherLocation = document.querySelector('#weatherLocation');
let searchButton = document.querySelector('#searchButton');
let searchInput = document.querySelector('#searchInput');
let forecastDay = document.querySelector('#forecast-day');
let forecastDate = document.querySelector('#forecast-date');
let todaysDegree = document.querySelector('#todaysDegree');
let todaysIcon = document.querySelector('#todaysIcon');
let todaysCondition = document.querySelector('#todaysCondition');
let todaysHumidity = document.querySelector('#todaysHumidity');
let todaysWind = document.querySelector('#todaysWind');
let todaysDirection = document.querySelector('#todaysDirection');
let nextForecastDays = document.querySelectorAll('.forecast-day');
let nextForecastDates = document.querySelectorAll('.forecast-date');
let cDaysDegree = document.querySelectorAll('.cDaysDegree');
let fDaysDegree = document.querySelectorAll('.fDaysDegree');
let daysIcon = document.querySelectorAll('.todaysIcon');
let daysCondition = document.querySelectorAll('.todaysCondition');
let daysHumidity = document.querySelectorAll('.todaysHumidity');
let daysWind = document.querySelectorAll('.todaysWind');
let daysDirection = document.querySelectorAll('.todaysDirection');
let cTodaysDegree = document.querySelector('#cTodaysDegree')
let fTodaysDegree = document.querySelector('#fTodaysDegree')
let subButton = document.querySelector('#subButton')
let subscribeFormControlInput = document.querySelector('#subscribeFormControlInput')

// Fetch API Data
async function getWeatherData(city) {
    let weatherApiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
    let weatherApiData = await weatherApiResponse.json();
    return weatherApiData;
}


// Display Main Data
function displayMainData(data) {
    const todaysDate = new Date();
    weatherLocation.innerHTML = `Weather in ${data.location.name}, ${data.location.country} `
    forecastDay.innerHTML = todaysDate.toLocaleDateString("en-US", { weekday: "long" })
    forecastDate.innerHTML = todaysDate.getDate() + ' ' + todaysDate.toLocaleDateString("en-US", { month: "long" });
    todaysDegree.innerHTML = data.current.temp_c + ` <sup>o</sup>` + 'C' + ' || ' + data.current.temp_f + ` <sup>o</sup>` + 'F';
    todaysIcon.setAttribute('src', data.current.condition.icon);
    todaysCondition.innerHTML = data.current.condition.text;
    todaysHumidity.innerHTML = data.current.humidity;
    todaysWind.innerHTML = data.current.wind_kph + " kph";
    todaysDirection.innerHTML = data.current.wind_dir;
    cTodaysDegree.innerHTML = data.forecast.forecastday[0].day.mintemp_c + ' ~ ' + data.forecast.forecastday[0].day.maxtemp_c + `<sup>o</sup>` + 'C';
    fTodaysDegree.innerHTML = data.forecast.forecastday[0].day.mintemp_f + ' ~ ' + data.forecast.forecastday[0].day.maxtemp_f + `<sup>o</sup>` + 'F';

}

// Display the rest of Data
function displaySecondaryData(data) {
    for (let i = 0; i < 2; i++) {
        const nextDate = new Date(data.forecast.forecastday[i + 1].date);
        nextForecastDays[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" })
        nextForecastDates[i].innerHTML = nextDate.getDate() + ' ' + nextDate.toLocaleDateString("en-US", { month: "long" });
        cDaysDegree[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c + ' ~ ' + data.forecast.forecastday[i + 1].day.maxtemp_c + `<sup>o</sup>` + 'C';
        fDaysDegree[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_f + ' ~ ' + data.forecast.forecastday[i + 1].day.maxtemp_f + `<sup>o</sup>` + 'F';
        daysIcon[i].setAttribute('src', data.forecast.forecastday[i + 1].day.condition.icon);
        daysCondition[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
        daysHumidity[i].innerHTML = data.forecast.forecastday[i + 1].day.avghumidity;
        daysWind[i].innerHTML = data.forecast.forecastday[i + 1].day.avgvis_km + " kph";
        daysDirection[i].innerHTML = data.current.wind_dir;
    }
}

// Starting Application
async function applicationStart(city = "cairo") {
    weatherData = await getWeatherData(city)
    if (!weatherData.error) {
        displayMainData(weatherData)
        displaySecondaryData(weatherData)
    }
}

applicationStart();

// Handling Search
searchButton.addEventListener('click', () => {
    applicationStart(searchInput.value)
})

// For Devs
subButton.addEventListener('click', () => {
    if (subscribeFormControlInput.value == "devLog") {
        console.log(weatherData);    
    }
})