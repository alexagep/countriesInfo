let select = document.getElementById("dropDown");
var flag = document.getElementsByClassName("flag")[0];
var callCode = document.getElementById("codeInside");
var countryName = document.getElementById("countryName");
var nativeName = document.getElementById("nativeName");
var capital = document.getElementById("capital");
var region = document.getElementById("region");   
var population = document.getElementById("population");
var language = document.getElementById("language");
var timezones = document.getElementById("timezones");
var googleMap = document.getElementsByClassName("googleMap")[0];
var currentWeather = document.getElementById("currentWeather"); 
var Humidity = document.getElementById("Humidity");
var WindSpeed = document.getElementById("WindSpeed");
var Temperature = document.getElementById("Temperature");
var Visibility = document.getElementById("Visibility");
var weatherIcon = document.getElementById("weatherIcon");


let countries;

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    countries = JSON.parse(this.responseText);
    assignValues();
    handleCountryChange();
  }
};
xhttp.open("GET", "https://restcountries.eu/rest/v2/all", true);
xhttp.send();



function assignValues() {
    countries.forEach(country => {
      let option = document.createElement("option");
      option.value = country.alpha2Code;
      option.innerHTML = country.name;
      select.appendChild(option);
    });
  }

function handleCountryChange() {
    let countryData = countries.find(
      country => select.value === country.alpha2Code
    );
    // $(".flag").html(`<img src="${countryData.flag}">`);

    flag.style.backgroundImage = `url(${countryData.flag})`;
    callCode.innerHTML = ` ${countryData.callingCodes}`;
    countryName.innerHTML = ` ${countryData.name}`;
    nativeName.style.color = "white"
    nativeName.innerHTML = ` ${countryData.nativeName}`;
    capital.style.color = "white"
    capital.innerHTML = ` ${countryData.capital}`;
    region.style.color = "white"
    region.innerHTML = ` ${countryData.region}`+`, ${countryData.subregion}`;
    population.style.color = "white"
    population.innerHTML = ` ${countryData.population}`;
    
    var choose = countryData.languages.map(a => a.name);
  
    language.style.color = "white"
    language.innerHTML = ` ${choose}`;

    timezones.style.color = "white"
    timezones.innerHTML = ` ${countryData.timezones}`;


  $(document).ready(function(){
    //get value from input field
    var city = ` ${countryData.capital}`
    
    
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1a256152c8029433462819505ebd3be6",
        type: "GET",
        dataType: "jsonp",
          success: function(data){      
           
            Wicon = data.weather[0].icon
            var urls =  ("http://openweathermap.org/img/wn/"+Wicon+"@2x.png")
            weatherIcon.src = `${urls}`;
            currentWeather.innerHTML = data.weather[0].main
            WindSpeed.innerHTML = data.wind.speed + " m/s"
            Temperature.innerHTML = Math.floor(data.main.temp - 273.15) + " °C"
            Humidity.innerHTML = data.main.humidity +" %"
            Visibility.innerHTML = data.visibility + " m"
            map = new google.maps.Map(document.getElementById("gMap"), {
              center: { lat: data.coord.lat, lng: data.coord.lon },
              zoom: 6,
            });
          }
          });
  });

};


select.addEventListener("change", handleCountryChange.bind(this));
