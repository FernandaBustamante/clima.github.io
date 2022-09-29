import React, {useState} from "react";
import Form from './Form'
import Card from './Card'

const WeatherPanel = ( ) =>{
    let urlWeather ="https://api.openweathermap.org/data/2.5/weather?appid=8353b42ad81c8fa5038ae9c229e3a33d&lang=es"
    let cityUrl= "&q=";
    let urlForecast ="https://api.openweathermap.org/data/2.5/forecast?appid=8353b42ad81c8fa5038ae9c229e3a33d&lang=es"

    const [weather, setWeather] =useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoanding] = useState(false);
    const [show,setShow] = useState(false);
    const [location, setLocation] = useState('');

    const getLocation = async(loc) =>{
        setLoanding(true);
        setLocation(loc);


        //weather
        urlWeather = urlWeather + cityUrl + loc;
         await fetch(urlWeather).then((response)=>{
            if(!response.ok) throw {response}
            return response.json();   
         }).then((weatherData)=>{
            console.log(weatherData);
            setWeather(weatherData)
         })
.catch(error =>{
    console.log(error)
    setLoanding(false);
    setShow(false);

    })
    /// forecast
    urlForecast = urlForecast + cityUrl + loc;
    await fetch(urlForecast).then((response)=>{
       if(!response.ok) throw {response}
       return response.json();   
    }).then((forecastData)=>{
       console.log(forecastData);
       setForecast(forecastData)

       setLoanding(false);
       setShow(true);
    })
.catch(error =>{
console.log(error)
setLoanding(false);
setShow(false);

})
    }
    return (

        <React.Fragment>
<Form

    newLocation = {getLocation}
/>

<Card

showData ={show}
loadingData = {loading}
weather= {weather}
forecast ={forecast}
/>

        </React.Fragment>
    );
    
}

export default WeatherPanel;