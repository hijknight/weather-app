

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const weatherDetails2 = document.querySelector('.weather-details-2');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {
    const APIKeyWeather = '6bb305dc81763ab2e65b4a5c897ca921';
    const location = document.querySelector('.search-box input').value;

    if (location === '') {
        alert('Please enter a location');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIKeyWeather}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '370px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            console.log(json)
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const hiLo = document.querySelector('.weather-box .hi-lo');
            const sunrise = document.querySelector('.weather-details-2 .sunrise span');
            const sunset = document.querySelector('.weather-details-2 .sunset span');
            const temperature = document.querySelector('.weather-box .temperature');
            const feelsLike = document.querySelector('.weather-box .feels-like');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                default:
                    image.src = 'images/default.png';
                    break;
            }

            function convertTimestampToTime(unixTimestamp) {
                const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds
                let hours = date.getHours(); // Get hours (0-23)
                const minutes = date.getMinutes(); // Get minutes
                const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

                // Convert to 12-hour format
                hours = hours % 12; // Convert 24-hour time to 12-hour time
                hours = hours ? hours : 12; // If hours are 0 (midnight/midday), set to 12

                // Format the time string
                return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            }

            const sunrise_time = convertTimestampToTime(json.sys.sunrise);
            const sunset_time = convertTimestampToTime(json.sys.sunset);
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°</span>`;
            hiLo.innerHTML = `Hi: ${parseInt(json.main.temp_max)}° Lo: ${parseInt(json.main.temp_min)}°`
            feelsLike.innerHTML = `Feels like: ${parseInt(json.main.feels_like)}°`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}mph at ${json.wind.deg}°`;
            sunrise.innerHTML = `${sunrise_time}`;
            sunset.innerHTML = `${sunset_time}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherDetails2.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            weatherDetails2.classList.add('fadeIn');
            container.style.height = '590px';

        });
});