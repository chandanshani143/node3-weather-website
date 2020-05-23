const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res) => {
    res.render('index', {           //we should leave the extension that is index.hbs 
        title: 'Weather',
        name: 'Chandan kumar shani'
    })                       //render allows to render the views
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'chandan kumar shani'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        description: 'This is some helpful text',
        name: 'chandan kumar shani'
    })
})
app.get('/weather', (req, res) => {   //req for request and res for response
   if(!req.query.address) {
       return res.send({
           error: 'Please provide a valid address'
       })
   }
   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
   })
//    res.send({
//        forecast: 'It is snowing',
//        address: req.query.address
//    })
// })
})
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404error', {
        errormessage: 'Help article not found',
        title: '404',
        name: 'chandan kumar shani'
    })
})

app.get('*',(req,res) => {
    res.render('404error', {
        errormessage: 'Page not found',
        name: 'chandan kumar shani',
        title: '404'
    })
})
app.listen(3000, () => {                   //helps to start the server
    console.log('server is up on port 3000')
})         