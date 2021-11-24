const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=861f22e9674ed20dcc27263903de294c'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to the weather service', undefined)
        }
        else if (response.body.cod >= 401) {
            callback('url is broken', undefined)
        }
        else {

            callback(undefined, {
                forecast: response.body.weather[0].description,
                icon: response.body.weather[0].icon
            })
        }
    })
}
module.exports = forecast