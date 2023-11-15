const ApiKey = "4495ee9dca4401895cd9ac1e78ffddc8";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchValue = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let showTime = document.getElementById('showTime')
showTime.style.display = 'none'
const restCountriesAPi =  'https://restcountries.com/v3.1/alpha/';
let countryPng;

  

async function checkWeather(city) {
const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);
console.log(response);
let data = await response.json();

const response2 = await fetch(restCountriesAPi + `${data.sys.country}`)
const data1 = await response2.json();
let countryFlag = data1[0].flags.png;
console.log(data1);
try {

document.querySelector(".city").innerHTML = `<h5>${data.sys.country=="IN"?data1[0].name.nativeName.hin.common:data1[0].altSpellings[0]} <img class="cFlag" src='${countryFlag}' alt=""></h5>`;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".Wind").innerHTML = data.wind.speed + "Km/h";
document.querySelector( ".weather-icon").src = `images/${data.weather[0].main}.png`;

document.querySelector(".Sunrise").innerHTML = convertUnixTimestampToTime(data.sys.sunrise, data.timezone) + " ";
document.querySelector(".Sunset").innerHTML = convertUnixTimestampToTime(data.sys.sunset, data.timezone) + " ";

document.querySelector(".time").innerHTML = showTimefn(data.dt,data.timezone);

console.log(data);
} catch (error) {
    searchValue.value = ""; 
    searchValue.classList.add('red-placeholder');
    searchValue.setAttribute("placeholder", "404 Not Found 😵");
    if(window.screen.width<500){
        searchValue.setAttribute("placeholder", "404 😵");
    }
}


}

function showTimefn(dtTimestamp,timezoneOffset){
    showTime.style.display = 'block';
    const dtDate = new Date((dtTimestamp + timezoneOffset) * 1000); 
    return localTime = dtDate.toLocaleTimeString("en-US", { timeZone: "UTC" });
}

searchBtn.addEventListener("click", () => {
  if (searchValue.value === "") {
    alert("Please Enter a city name");
  } 
  else {
    checkWeather(searchValue.value);
  }
});

function convertUnixTimestampToTime(unixTimestamp, timezoneOffset) {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000);
  const hours = date.getUTCHours(); // 24 hour format
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12; // if hour is 13 then 13%12 = 1 or 12%12 = 12

  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}

