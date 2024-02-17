'use strict'

const searchParams = new URLSearchParams({
    q: 'Kyiv',
    units: 'metric',
    APPID: '5d066958a60d315387d9492393935c19',
})

fetch(`https://api.openweathermap.org/data/2.5/weather?${searchParams}`)
    .then((response) => response.json())
    .then((data) => {
        const body = document.querySelector('body')
        const div = document.createElement('div')
        if (data.weather.length === 0) {
            div.innerHTML = 'Can not load weather data'
            body.append(div)
            return
        }
        div.innerHTML = `<p>
                            <img 
                                src='http://openweathermap.org/img/w/${data.weather[0].icon}.png' 
                                alt='Weather icon'
                                width="50" 
                                height="50"
                            >
                         </p>
                         <p>Your city: ${data.name}</p>
                         <p>Temperature: ${data.main.temp}</p>
                         <p>Pressure: ${data.main.pressure}</p> 
                         <p>Description: ${data.weather[0].description}</p> 
                         <p>Humidity: ${data.main.humidity}</p> 
                         <p>Wind Speed: ${data.wind.speed}</p> 
                         <p>Wind Deg: ${data.wind.deg}</p> 
                         `
        body.append(div)
    })
