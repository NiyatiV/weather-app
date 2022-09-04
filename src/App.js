import './App.scss';
import { API_URL_WEATHER,apiOptions} from './api';
import CityWeather from './components/city-weather/city-weather';
import React, { useEffect, useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import Switch from "react-switch";

    let cityList = ['OTTAWA','MOSCOW','TOKYO'];
    let clickedCity = cityList[0];
    let dataInCel;
    let dataInFah;

function App() {
  const [currentCity, setCurrentCity] = useState({});
  const [forecasts, setForecast] = useState([]);
  const [loading,setLoading] = useState(false);
  const [checkedTemp, setCheckedTemp] = useState(true);
  const [checkedTheme, setCheckedTheme] = useState(true);
 
  useEffect(() => {
    weatherAPICall(cityList[0]);
  }, []
  )

  // API call for current weather and forecast
  const weatherAPICall = (cityName) => {
  setCheckedTemp(true);
  setLoading(true);
  fetch(`${API_URL_WEATHER}?location=${cityName}&format=json&u=f`, apiOptions)
  .then(response => response.json())
  .then(response => {
      setCurrentCity(response.current_observation.condition);
      setForecast(response.forecasts);
      dataInFah = JSON.parse(JSON.stringify(response));
      setLoading(false);
      calculateInCelsius(JSON.parse(JSON.stringify(response)));
  })
  .catch(err => console.error(err));
  }

  // Call to convert the temp into celsius
  const calculateInCelsius = (resp) => {
    console.log("log resp ",resp);
    dataInCel = resp
    dataInCel.current_observation.condition.temperature = convertFahToCel(resp.current_observation.condition.temperature);
    for(let i=0 ; i <4 ; i++) {
      dataInCel.forecasts[i].high = convertFahToCel(resp.forecasts[i].high);
    }
    console.log(dataInCel);
    
  }

  // Calculation to convert into celsuis
  const convertFahToCel = (fTemp) => {
    return ((fTemp - 32) * 5 / 9).toFixed(0);
  }
  
  // To handle onclick of city name
  const handleClick = (cityName) => {
    clickedCity = cityName;
    weatherAPICall(cityName);
  }

  // Handle toggle button for temperature
  const handleChange = (checked) => {
    setCheckedTemp(checked);
    if(!checked) {
      setCurrentCity(dataInCel.current_observation.condition);
      setForecast(dataInCel.forecasts);
    } else {
      setCurrentCity(dataInFah.current_observation.condition);
      setForecast(dataInFah.forecasts);
    }
  }

   // Handle toggle button for theme
  const handleThemeChange = (checked) => {
    setCheckedTheme(checked);
    if(!checked) {
      document.documentElement.style.setProperty('--background', '#eefbf1');
    } else {
      document.documentElement.style.setProperty('--background', '#eef6fb');
    }
  }

  return (
    <div className="container min-vh-100">
      <div className="temp-toggle">
        <label>&deg;C</label>
        <Switch onChange={handleChange} checked={checkedTemp} onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={40}
            className="react-switch switch-margin"
            id="material-switch" />
        <label>&deg;F</label>
      </div>
      <div className="city-header row justify-content-center p-4">
        <div className="col-lg-4 col-md-6 col-12 col-xs-12">
            <div className="col-lg-12 col-md-12 col-12 col-xs-12" >
            {cityList.map(city => {
              return (
                <button className={"col-lg-4 col-md-4 col-4 col-xs-4" + (clickedCity === city ? ' activeBtn' : '')}  onClick={() => handleClick(city)}>{city}</button>
              )
            })}   
            </div>
        </div>
      </div>
      <div className="theme-toggle">
      <label>Theme: </label>
        <Switch onChange={handleThemeChange} checked={checkedTheme} offColor="#86d3ff" onColor="#8befbf"
            onHandleColor="#eef6fb"
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={40}
            className="react-switch switch-margin"
            id="material-switch" />
      </div>
      <CityWeather weather = {currentCity} forecast = {forecasts} loading = {loading}/>
      
    </div>
  );
}

export default App;
