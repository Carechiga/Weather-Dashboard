var getWeatherBtn = document.getElementById('get-weather');
var cityName = document.getElementById('city-name');
var stateCode = document.getElementById('state-select');
var countryCode = document.getElementById('country-code');

var currentWeatherContainer = document.getElementById('currentWeather');
var weeklyWeatherContainer = document.getElementById('weeklyForecast');
var currentWeatherIcon = document.getElementById('currentWeatherIcon');
var currentCardTitle = document.getElementById('currentCardTitle');
var currentCardText = document.getElementById('currentCardText');
var currentFeelsLike = document.getElementById('currentFeelsLike');
var currentHumidity = document.getElementById('currentHumidity');
var currentwind = document.getElementById('currentWind');
var currentVisibility = document.getElementById('currentVisibility');

function writeCurrentWeather(data){
        var currentDT = data.list[0].dt;
        var currentDate = new Date(currentDT * 1000);
        
        currentVisibility.classList.remove("custom-hidden");
        currentVisibility.classList.add("custom-visible");
        currentWeatherIcon.src = 'http://openweathermap.org/img/wn/'+ data.list[0].weather[0].icon + '@4x.png';
        currentCardTitle.textContent = currentDate.toDateString() + " - " + data.city.name;
        currentCardText.textContent = data.list[0].main.temp + "°F";
        currentFeelsLike.textContent = 'Feels like: ' + data.list[0].main.feels_like + "°F";
        currentHumidity.textContent = 'Humidity: ' + data.list[0].main.humidity + "%";
        currentWind.textContent = 'Wind: ' + data.list[0].wind.speed + " mph";
}

function writeWeeklyWeather(data){

}

function storeCityData(){

}

function getWeatherCity(event) {

    //this takes city input and retrieves latitude and longitude from API
        event.preventDefault();
        var citySpan = cityName.value.toLowerCase();
        var stateSpan = "," + stateCode.value.toLowerCase();
        var countrySpan = "," + countryCode.value;      
        var geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySpan + stateSpan + countrySpan + '&limit=1&appid=792edf62aceac617f83db5acead1d197';
        console.log(geocodingURL);

    fetch(geocodingURL)
        .then(function(response){
        return response.json();
        }).then(function(data){
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
     
       //creates a url string with latitude and longitude values and uses to fetch weather
       
        var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=792edf62aceac617f83db5acead1d197';
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
        titleElWeekly.textContent = date.toDateString() + " -- " + data.city.name;
  
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

        // creates current Weather card
        writeCurrentWeather(data);
        })     
    }) 
    }



    getWeatherBtn.addEventListener("click", getWeatherCity);
    
