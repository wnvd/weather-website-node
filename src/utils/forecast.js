const request = require("postman-request");


const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=08f9534cbe3b06063f5a5f947c253329&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";
    
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to the Weather Service', undefined);
        }else if(body.error){
            callback('Unable to find the location', undefined);
        }else{
            
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out." +'But it feels like ' +body.current.feelslike +' and the humidity is '+body.current.humidity+'%.')
        }
    })
  
};

module.exports = forecast;
