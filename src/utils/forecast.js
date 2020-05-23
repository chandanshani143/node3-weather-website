const request = require('postman-request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f8eec37b42795856399165e8bcfd82d2&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
        callback('unable to connect the weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location.',undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '.It is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.feelslike + ' degree out.')
        }
    })

}

module.exports = forecast