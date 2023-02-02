var getWeatherBtn = document.getElementById('get-weather');
var getWeatherBtnTwo = document.getElementById('get-weather-latlon');
var cityName = document.getElementById('city-name');
var stateCode = document.getElementById('state-select');
var countryCode = document.getElementById('country-code');
var latitude = document.getElementById('lat');
var longitude = document.getElementById('lon');
var currentWeatherContainer = document.getElementById('currentWeather');
var weeklyWeatherContainer = document.getElementById('weeklyForecast');

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function getWeatherCity(event) {
        event.preventDefault();
        var citySpan = cityName.value.toLowerCase();
        var stateSpan = "," + stateCode.value.toLowerCase();
        var countrySpan = "," + countryCode.value;      
        var geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySpan + stateSpan + countrySpan + 'appid=792edf62aceac617f83db5acead1d197';

        console.log(geocodingURL);

    fetch(geocodingURL)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data);
    })
    }

function getWeatherLatLon(event){
    event.preventDefault();
    var latSpan = latitude.value;
    var lonSpan = longitude.value;      
    var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latSpan + '&lon=' + lonSpan + '&units=imperial&appid=792edf62aceac617f83db5acead1d197';
    console.log(weatherURL);

    fetch(weatherURL)
    .then(function(response){
        return response.json();
    }).then(function(data){
    console.log(data);

    //generate weekly forecast day-cards
    var WFHeader = document.createElement('h3');
    WFHeader.classList.add('custom-center');
    WFHeader.textContent = "Weekly Forecast";
    weeklyWeatherContainer.append(WFHeader);
    
    for(let i = 1; i < 6; i++){
    var dt = data.list[(i * 8) - 1].dt;
    var date = new Date(dt * 1000);
   
    var displayWeeklyWeather = document.createElement('div'); 
    displayWeeklyWeather.classList.add('container-fluid', 'custom-container', 'col');
    weeklyWeatherContainer.append(displayWeeklyWeather);
  
    var weeklyWeatherContent = document.createElement('div');
    weeklyWeatherContent.classList.add('card', 'customCard,', 'text-primary-emphasis', 'bg-primary-subtle', 'border', 'border-primary-subtle');
    displayWeeklyWeather.append(weeklyWeatherContent);
   
    var cardBodyWeekly = document.createElement('div');
    cardBodyWeekly.classList.add('card-body');
    weeklyWeatherContent.append(cardBodyWeekly);

    var weatherIconWeekly = document.createElement('img');
    weatherIconWeekly.src = 'http://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon + '@2x.png';

    var titleElWeekly = document.createElement('h3');
    titleElWeekly.classList.add('card-title');
    titleElWeekly.textContent = date.toDateString() + " - " + data.city.name;
  
    var cardTextWeekly = document.createElement('h4');
    cardTextWeekly.classList.add('card-text');
    cardTextWeekly.textContent = data.list[i].main.temp + "°F";
  
    cardBodyWeekly.append(titleElWeekly, weatherIconWeekly, cardTextWeekly);

    var weatherListWeekly = document.createElement('ul');
    weatherListWeekly.classList.add('list-group', 'list-group-flush');
    weeklyWeatherContent.append(weatherListWeekly);

    var feelWeekly = document.createElement('li');
    feelWeekly.classList.add('list-group-item');
    feelWeekly.textContent = 'Feels like: ' + data.list[i].main.feels_like + "°F";

    var humidityWeekly = document.createElement('li');
    humidityWeekly.classList.add('list-group-item');
    humidityWeekly.textContent = 'Humidity: ' + data.list[i].main.humidity + "%";

    var windWeekly = document.createElement('li');
    windWeekly.classList.add('list-group-item');
    windWeekly.textContent = 'Wind: ' + data.list[i].wind.speed + " mph";

    weatherListWeekly.append(feelWeekly, humidityWeekly, windWeekly);
    }

    // creates 
    var CWHeader = document.createElement('h2');
    CWHeader.classList.add('custom-center');
    CWHeader.textContent = "Current Weather";
    currentWeatherContainer.append(CWHeader);
    
    var currentDT = data.list[0].dt;
    var currentDate = new Date(currentDT * 1000);
   
    var displayCurrentWeather = document.createElement('div'); 
    displayCurrentWeather.classList.add('container-fluid', 'custom-container', 'col');
    currentWeatherContainer.append(displayCurrentWeather);
  
    var currentWeatherContent = document.createElement('div');
    currentWeatherContent.classList.add('card', 'customCard,', 'text-primary-emphasis', 'bg-primary-subtle', 'border', 'border-primary-subtle');
    displayCurrentWeather.append(currentWeatherContent);
   
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    currentWeatherContent.append(cardBody);

    var weatherIcon = document.createElement('img');
    weatherIcon.src = 'http://openweathermap.org/img/wn/'+ data.list[0].weather[0].icon + '@4x.png';

    var titleEl = document.createElement('h3');
    titleEl.classList.add('card-title');
    titleEl.textContent = currentDate.toDateString() + " - " + data.city.name;
  
    var cardText = document.createElement('h4');
    cardText.classList.add('card-text');
    cardText.textContent = data.list[0].main.temp + "°F";
  
    cardBody.append(titleEl, weatherIcon, cardText);

    var weatherList = document.createElement('ul');
    weatherList.classList.add('list-group', 'list-group-flush');
    currentWeatherContent.append(weatherList);

    var feel = document.createElement('li');
    feel.classList.add('list-group-item');
    feel.textContent = 'Feels like: ' + data.list[0].main.feels_like + "°F";

    var humidity = document.createElement('li');
    humidity.classList.add('list-group-item');
    humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + "%";

    var wind = document.createElement('li');
    wind.classList.add('list-group-item');
    wind.textContent = 'Wind: ' + data.list[0].wind.speed + " mph";

    weatherList.append(feel, humidity, wind);})
}



    getWeatherBtn.addEventListener("click", getWeatherCity);

    getWeatherBtnTwo.addEventListener("click", getWeatherLatLon);
    
