const API_KEY = '1e8dd688f0eb092a48f169f41b3dc446';
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) {
        return response.json();
    }).then(function(json) {
        $weatherLoaction.textContent = json.name;
        $weatherNum.textContent = Math.round(`${json.main.temp}`) + '°C';

        const IMG_URL = "img/" + json.weather[0].icon + ".png";
        $weather.style.background = `url(${IMG_URL}) no-repeat 20px center / 40px`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude,
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('error')
}

function askForLoaction() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadLocation() {
    const loadedLoaction = localStorage.getItem(COORDS);

    if(loadedLoaction === null) {
        askForLoaction();
    } else {
        const parsedCoords = JSON.parse(loadedLoaction);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }

}

askForLoaction();