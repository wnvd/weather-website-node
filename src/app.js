const request = require('postman-request')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join (__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Naveed'
    })

})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name:'Naveed'
    })
})


app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        msg:'This is help message printing',
        name:'Naveed'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
          error:'You must provide an address!'

        })
    }
   
    geocode(req.query.address, (error, {latitude, longitude, location}= {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
               forecast: forecastData,
               location,
               address: req.query.address
            })
        })
    })


    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({ 
        product: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('error',{
        title: '404',
        name: 'Naveed',
        msg:'Help article not found'
    })
})

// this 404 handler come in last
app.get('*', (req, res)=>{
        res.render('error', {
            title: '404',
            name: 'Naveed',
            msg: '404 Page not found'
        })
})


app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
})