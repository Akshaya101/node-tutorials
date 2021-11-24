const path = require('path')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

//define paths for express configuration
//console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup ejs engine and the templates/views(the individual templates) location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Doe'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'search term not provided'
        })
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'John Doe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John Doe',
        message: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    //functionality code
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, { forecast }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                address: req.query.address,
                forecast: forecast
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Help',
        message: 'Help article not found',
        name: 'John Doe'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404!',
        message: '404. Page Not Found!',
        name: 'John Doe'
    })
})

//app.listen()
app.listen(port, function () {
    console.log(`Port ${port} is up for it`)
})