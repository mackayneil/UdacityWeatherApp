const emoji = {
    Clouds: `☁️`,
    Rain: `🌦`,
    Thunderstorm: `⛈`,
    Snow: `🌨`,    
    Clear: `☀️`,
    Drizzle: `🌧`,
    Squall: `🌧`,
    Smoke: `💨`,
    Mist: `🌫`,
    Haze: `🌫`,
    Dust: `🌫`,
    Ash: `💨`,
    Tornado: `🌪`
   
}

const images = {   
        Clouds: {
            img: 'url(Assets/Clouds.jpg)',
            attrText: 'Tree Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/tree'
        },
        Rain: {
            img: 'url(Assets/Rain.jpg)',
            attrText: 'Nature Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/nature'
        },
        Thunderstorm: {
            img: 'url(Assets/Thunderstorm.jpg)',
            attrText: 'Nature Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/nature'
        },
        Snow: {
            img: 'url(Assets/Snow.jpg)',
            attrText: 'Weather Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/weather'
        },
        Clear: {
            img: 'url(Assets/Clear.jpg)',
            attrText: 'Cloud Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/cloud'
        },
        Drizzle: {
            img: 'url(Assets/Rain.jpg)',
            attrText: 'Nature Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/nature'
        },
        Squal: {
            img: 'url(Assets/Rain.jpg)',
            attrText: 'Nature Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/nature'
        },
        Smoke: {
            img: 'url(Assets/Smoke.jpg)',
            attrText: 'Nature Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/nature'
        },
        Mist: {
            img: 'url(Assets/Mist.jpg)',
            attrText: 'Mist Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/mist'
        },
        Haze: {
            img: 'url(Assets/Haze.jpg)',
            attrText: 'Haze Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/haze'
        },
        Dust: {
            img: 'url(Assets/Dust.jpg)',
            attrText: 'Vector Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/vector'
        },
        Ash: {
            img: 'url(Assets/Smoke.jpg)',
            attrText: 'Nature Vectors by Vecteez',
            attrHref: 'https://www.vecteezy.com/free-vector/nature'
        },
        Tornado: {
            img: 'url(Assets/Tornado.jpg)',
            attrText: 'Rain Landscape Vectors by Vecteezy',
            attrHref: 'https://www.vecteezy.com/free-vector/rain-landscape'
        }
}

const daysOfWeek = [
    `Sun`,
    `Mon`, 
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`    
];
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];



const baseURL = 'https://api.openweathermap.org/data/2.5/weather?',
      foreCastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=',
      metric = '&units=metric',
      imperial = '&units=imperial',
      apiKey = '&appid=42da4e6b48597278286170dfa8d9c149',
      submitBtn = document.querySelector('#generate'),
      humidity = document.querySelector('#humidity'),
      windSpeed = document.querySelector('#wind-speed'),
      pressure = document.querySelector('#pressure'),
      feelsLike = document.querySelector('#feels-like'),
      temperature = document.querySelector('#temp'),
      city = document.querySelector('#city'),
      country = document.querySelector('#country'),
      condition = document.querySelector('#condition'),
      loadingScreen = document.querySelector('#loading-screen');;

let userCity = ``,
    lat,
    long,
    latAndLong,
    forecastTemp = [],        
    forecastCondition= [],
    foreCastDay = [],
    foreCastDate = [],
    foreCastMonth = [];


// Fills all the main data on the page
const inputTheData = (apiData) => {
    const errorMsg = document.querySelector('#error-msg');
    errorMsg.innerHTML = '';
    humidity.innerHTML = `${apiData.main.humidity}%`;
    windSpeed.innerHTML = `${apiData.wind.speed}mph`;
    pressure.innerHTML = `${apiData.main.pressure}mb`;
    feelsLike.innerHTML = `${apiData.main.feels_like}°C`;
    temperature.innerHTML = `${Math.floor(apiData.main.temp)}°C`;
    city.innerHTML = `${apiData.name}, ${apiData.sys.country}`;            
    condition.innerHTML = `${apiData.weather[0].main} <span class="emoji">${emoji[apiData.weather[0].main]}</span>`;
}

// Pulls data from API 
const getLocation = async (url, location, units, key) => {   
    const errorMsg = document.querySelector('#error-msg');
    try {        
        const resp = await fetch(url+location+units+key);
        const data = await resp.json();
        if (data.cod === "404") {
            errorMsg.innerHTML = 'Please enter a valid zip code';
        } else {                  
            inputTheData(data);
            changeBackground(data);
            userCity = data.name;                  
            return data;
        }        
    }
    catch (error) {
        console.log('error', error);
        errorMsg.innerHTML = 'Please enter a valid zip code';
    }
}



// Changes background
let changeBackground = (data) => {
    const attribution = document.querySelector('#attribution'),
          backgroundImage = document.querySelector('#background-img');

    for (const key in images) {
        if (key === data.weather[0].main) {
            if (Object.hasOwnProperty.call(images, key)) {
                const element = images[key];
                attribution.innerHTML = element.attrText;
                attribution.setAttribute('href', element.attrHref);
                backgroundImage.style.backgroundImage = element.img;
            }
        }
     }
}




// Get forecast temp and condition
const getForecast = async (url, location, units, key) => {
    try {
        const resp = await fetch(url+location+units+key);
        const data = await resp.json();
        // Resets all array data
        forecastTemp = [],        
        forecastCondition= [],
        foreCastDay = [],
        foreCastDate = [],
        foreCastMonth = [];
    
         for (let i = 1; i < data.list.length; i++) {
            if (i % 7 === 0) {               
                const timeStamp = data.list[i].dt,
                      date = new Date(timeStamp * 1000),
                      day = date.getDay(),
                      dateNum = date.getDate(),   
                      month = date.getMonth();

                foreCastMonth.push(month);
                foreCastDate.push(dateNum);     
                foreCastDay.push(day);                    
                forecastTemp.push(Math.round(data.list[i].main.temp));                
                forecastCondition.push(data.list[i].weather[0].main);        
            };
        };     

    }
    catch (error) {
        console.log('error', error);
    }
}; 

// Fills all the forecast data on the page
const inputForecastData = () => {
    const forecastCardTemp = document.querySelectorAll('.forecast-temp'),        
          emojiCard = document.querySelectorAll('.emoji-forecast'),
          forecastCardDay = document.querySelectorAll('.forecast-day'),
          forecastCardDate = document.querySelectorAll('.forecast-date');;        
        
        forecastCardDate.forEach(function(el, i) {            
            el.innerHTML = `${months[foreCastMonth[i]]}, ${foreCastDate[i]}`;
        });

        forecastCardDay.forEach(function(el, i) {            
            el.innerHTML = `${daysOfWeek[foreCastDay[i]]}`;
        });

        forecastCardTemp.forEach(function(el, i) {            
            el.innerHTML = `${forecastTemp[i]}°C`;
        });
        emojiCard.forEach(function(el, i) {            
            el.innerHTML = `<span class="forecast-condition">${forecastCondition[i]}</span>${emoji[forecastCondition[i]]}`;
        });
};

// Find co-ords
let findUserCords = () => {
   
}

// Promise function that gets users location from co-ords
const findUserLocation = () => {
   return new Promise(function(resolve, reject) {
    window.addEventListener('load', function() {
          if(!navigator.geolocation) {
            loadingScreen.innerHTML = `Geolocation is not supported by your browser`; 
          } else {           
            navigator.geolocation.getCurrentPosition(success, error);
          }                   
    }); 
    function error() {
        hideLoading();        
       }
    function success(position) {   
            lat = position.coords.latitude,
            long = position.coords.longitude,        
            latAndLong = `lat=${lat}&lon=${long}`;  
            resolve(`worked`);       
        }
   })
  
};

// Function that hides loading screen
const hideLoading = () => { 
    loadingScreen.classList.add('d-none');
};



// Envokes Promise, then hides loading screen
findUserLocation()
.then(function(val){  
   return getLocation(baseURL, latAndLong, metric, apiKey); 
})
.then (function(val) {
    return getForecast(foreCastURL, `${userCity}`, metric, apiKey);
})
.then(function(val) {
    return inputForecastData();
})
.then(function(val) {
   return hideLoading(val); 
})

// Outputs user's feelings data
const getFeelings = () => {
    const feelingInput = document.querySelector('#feelings').value.toLowerCase();    
    if (feelingInput !== '') {        
         return feelingInput
    }            
}

// Retrieves the user input
const postData = async ( url='', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
    },
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}


const postGet = () => {
    let feeling = getFeelings();       
    postData('/addData', {answer: feeling})
      .then(function(data){  
        retrieveData('/all')
      })
      updateUI();
  }
    

// Updates the page with the user input
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        const feelingsOutput = document.querySelector('#content');
        if (allData.answer !== undefined) {
            feelingsOutput.innerHTML = `And you're feeling ${allData.answer}`;
        }        
    } catch(error) {
        console.log('error', error);
    }
 }


// Gets weather data from API
const getWeather = (e) => {
    e.preventDefault()
    const zipCodeInput = `zip=` + document.querySelector('#zip').value;

    getLocation(baseURL, zipCodeInput, metric, apiKey)
    .then(function(val) {        
        return getForecast(foreCastURL, `${userCity}`, metric, apiKey);
    })
    .then(function(val) {    
        return inputForecastData();
    });
    postGet();
};

// Gets weather data from user zip code
submitBtn.addEventListener('click', getWeather);



// Displays current date
let displayDate = () => {
    const date = document.querySelector('#date');         
    const currentDate = new Date(),
          dayOfWeek = currentDate.getDay(),
          month = currentDate.getMonth(),
          dayNum = currentDate.getDate(),
          year = currentDate.getFullYear();

          date.innerHTML = `${daysOfWeek[dayOfWeek]}, ${months[month]} ${dayNum} ${year}`; 
}
displayDate();




