var getWeatherBtn = document.getElementById('get-weather');
var cityName = document.getElementById('city-name');
var stateCode = document.getElementById('state-select');
var countryCode = document.getElementById('country-code');

var currentWeatherContainer = document.getElementById('currentWeather');
var currentWeatherIcon = document.getElementById('currentWeatherIcon');
var currentCardTitle = document.getElementById('currentCardTitle');
var currentCardText = document.getElementById('currentCardText');
var currentFeelsLike = document.getElementById('currentFeelsLike');
var currentHumidity = document.getElementById('currentHumidity');
var currentwind = document.getElementById('currentWind');
var currentVisibility = document.getElementById('currentVisibility');

var weeklyWeatherContainer = document.getElementById('weeklyForecast');
var weeklyIcon = document.querySelectorAll('.weeklyWeatherIcon');
var weeklyCardTitle = document.querySelectorAll('.weeklyCardTitle');
var weeklyCardText = document.querySelectorAll('.weeklyCardText');
var weeklyFeel = document.querySelectorAll('.weeklyFeel');
var weeklyHumidity = document.querySelectorAll('.weeklyHumidity');
var weeklyWind = document.querySelectorAll('.weeklyWind');

var cityHistory = document.getElementById('cityHistoryDiv');

// this array is for calling on local storage to load saved cities when the app is first opened, limited to the 10 most recent searches
var localStorageArray = ['obj1', 'obj2', 'obj3', 'obj4', 'obj5', 'obj6', 'obj7', 'obj7', 'obj8', 'obj9', 'obj10'];
var storageIndex = 0;


//this function takes data from the weather API and puts it into the appropriate HTML elements for the current day
function writeCurrentWeather(data){
        var currentDT = data.list[0].dt;
        var currentDate = new Date(currentDT * 1000);
        
        currentVisibility.classList.remove("custom-hidden");
        currentVisibility.classList.add("custom-visible");
        currentWeatherIcon.src = 'http://openweathermap.org/img/wn/'+ data.list[0].weather[0].icon + '@4x.png';
        currentCardTitle.textContent = currentDate.toDateString();
        currentCardText.textContent = data.city.name + " - " + data.list[0].main.temp + "°F";
        currentFeelsLike.textContent = 'Feels like: ' + data.list[0].main.feels_like + "°F";
        currentHumidity.textContent = 'Humidity: ' + data.list[0].main.humidity + "%";
        currentWind.textContent = 'Wind: ' + data.list[0].wind.speed + " mph";
}

//this function takes data from the weather API and puts it into the appropriate HTML elements for the Weekly Forecast
function writeWeeklyWeather(data){
    weeklyVisibility.classList.remove("custom-hidden");
    weeklyVisibility.classList.add("custom-visible");
      
    for(let i = 1; i < 6; i++){
    var dt = data.list[(i * 8) - 1].dt;
    var date = new Date(dt * 1000);
  
    weeklyIcon[i - 1].src = 'http://openweathermap.org/img/wn/'+ data.list[i].weather[0].icon + '@2x.png';
    weeklyCardTitle[i -1].textContent = date.toDateString();
    weeklyCardText[i - 1].textContent = data.city.name + " - " + data.list[i].main.temp + "°F";
    weeklyFeel[i - 1].textContent = 'Feels like: ' + data.list[i].main.feels_like + "°F";
    weeklyHumidity[i - 1].textContent = 'Humidity: ' + data.list[i].main.humidity + "%";
    weeklyWind[i - 1].textContent = 'Wind: ' + data.list[i].wind.speed + " mph";
    }
}

//this button creates a button for a recenetly searched Location and appends it to the docuement
function createHistoryButton(object){
    var cityButton = document.createElement('button');
    cityButton.classList.add('btn', 'btn-primary');
    cityButton.setAttribute('type', 'submit');
    cityButton.setAttribute('style', 'margin: 5px');
    cityButton.setAttribute('data-lat', object.lat);
    cityButton.setAttribute('data-lon', object.lon);
    cityButton.textContent = object.name;
    cityHistory.append(cityButton);


}

//this function takes appropriate API URL and returns the info and writes it to the page for the entered location
function fetchWeather (URL){
    fetch(URL)
    .then(function(response){
    return response.json();
    }).then(function(data){
    console.log(data);

    //generate weekly forecast day-cards
    writeWeeklyWeather(data);

    // creates current Weather card
    writeCurrentWeather(data);
    })  
}

//This function triggers the fetch weather when the get weather button is clicked and uses the selected data to create the API call
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
        
        const latLonObj = {
            name: cityName.value,
            lat: latitude,
            lon: longitude
        }
        //sets city name + lat and lon to local storage
                localStorage.setItem(localStorageArray[storageIndex], JSON.stringify(latLonObj));
                if(storageIndex < 10){
                storageIndex++;}
                else{
                    storageIndex = 0;
                }

        createHistoryButton(latLonObj);
     
       //creates a url string with latitude and longitude values and uses to fetch weather
       
        var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=792edf62aceac617f83db5acead1d197';
        console.log(weatherURL);

     fetchWeather(weatherURL)  
    }) 
}

//this function calls the API with the data stored in the history buttons
function getWeatherHistory(event){
    event.preventDefault;
    var latitude = event.target.getAttribute('data-lat');
    var longitude = event.target.getAttribute('data-lon');
    var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=792edf62aceac617f83db5acead1d197';
        console.log(weatherURL);
  fetchWeather(weatherURL);      

}

// this will load up to 10 recent searches as buttons on load of the page
function loadRecents (){
        for(let i = 0; i < localStorageArray.length; i++){
        
            var temp = JSON.parse(localStorage.getItem(localStorageArray[i]));
            if(temp){
                console.log(temp)
            createHistoryButton(temp);}
        }
}

loadRecents();

    getWeatherBtn.addEventListener("click", getWeatherCity);
    cityHistory.addEventListener("click", getWeatherHistory);
