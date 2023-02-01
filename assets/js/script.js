var requestURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=792edf62aceac617f83db5acead1d197';
var geocodingURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=3appid=792edf62aceac617f83db5acead1d197'

function getWeather(){
    var cityName = city;
    var stateCode = state;
    var geocodingURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + stateCode + '&limit=1appid=792edf62aceac617f83db5acead1d197';
fetch(geocodingURL)
.then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
})
}
