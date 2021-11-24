const request = require('postman-request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWMtMTAxIiwiYSI6ImNrdWVjcDdheTBiZWcycW52ZTFveTRxeGMifQ.uNg2gik8Go2idy4uk85KBw'
    request({ url: url, json: true }, (error, response) => {
        //console.log(response.body.features)
        if (error) {
            callback('Unable to connect to the network services', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                latitude: (response.body.features[0].center[1]).toFixed(4),
                longitude: (response.body.features[0].center[0]).toFixed(4),
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

//Math.round((num + Number.EPSILON) * 100) / 100