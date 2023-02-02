var getWeatherBtn = document.getElementById('get-weather');
var getWeatherBtnTwo = document.getElementById('get-weather-latlon');
var cityName = document.getElementById('city-name');
var stateCode = document.getElementById('state-select');
var countryCode = document.getElementById('country-code');
var latitude = document.getElementById('lat');
var longitude = document.getElementById('lon');
var currentWeatherContainer = document.getElementById('todays-weather');
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
    for(let i = 1; i < 6; i++){
    var dt = data.list[(i * 8) - 1].dt;
    var date = new Date(dt * 1000);
   
    var displayCurrentWeather = document.createElement('div'); 
    displayCurrentWeather.classList.add('container-fluid', 'row', 'custom-container', 'col');
    weeklyWeatherContainer.append(displayCurrentWeather);
  
    var currentWeatherContent = document.createElement('div');
    currentWeatherContent.classList.add('card', 'customCard');
    displayCurrentWeather.append(currentWeatherContent);
   
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    currentWeatherContent.append(cardBody);

    var weatherIcon = document.createElement('img');
    weatherIcon.src = 'http://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon + '@2x.png';

    var titleEl = document.createElement('h3');
    titleEl.classList.add('card-title');
    titleEl.textContent = date.toDateString() + " - " + data.city.name;
  
    var cardText = document.createElement('h4');
    cardText.classList.add('card-text');
    cardText.textContent = data.list[i].main.temp + "°F";
  
    cardBody.append(titleEl, weatherIcon, cardText);

    var weatherList = document.createElement('ul');
    weatherList.classList.add('list-group', 'list-group-flush');
    currentWeatherContent.append(weatherList);

    var feel = document.createElement('li');
    feel.classList.add('list-group-item');
    feel.textContent = 'Feels like: ' + data.list[i].main.feels_like + "°F";

    var humidity = document.createElement('li');
    humidity.classList.add('list-group-item');
    humidity.textContent = 'Humidity: ' + data.list[i].main.humidity + "%";

    var wind = document.createElement('li');
    wind.classList.add('list-group-item');
    wind.textContent = 'Wind: ' + data.list[i].wind.speed + " mph";

    weatherList.append(feel, humidity, wind);
    }}
    )
}



    getWeatherBtn.addEventListener("click", getWeatherCity);

    getWeatherBtnTwo.addEventListener("click", getWeatherLatLon);
    
