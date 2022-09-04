import "./city-weather.scss";
import React from "react";
import { ThreeDots } from 'react-loader-spinner'

const CityWeather = (props) => {
   
    return (
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-7 weather-box p-0">
                <div className={"col-lg-12 top-weather-box p-4 " + (props.loading ? 'hide-content' : '')}>
                    <div className="text-center">
                        <p className="day"> Today </p>
                        <div className="box-style">
                            <div>
                                <img alt="weather" className="weather-icon" src={`icons/${props.weather.code}.png`}
                                onError={(e) => {
                                    return e.target.onerror = null, e.target.src = 'icons/unknown.png';
                                }}/>
                            </div>
                            <div className="d-inline-block p-3">
                                <div className="temperature text-left">{props.weather.temperature}&deg;</div>
                                <div className="text">{props.weather.text} </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row bottom-weather-box " + (props.loading ? 'hide-content' : '')}>

                {props.forecast.map((forecast,ind) => {
                    if(ind < 4){
                        return (
                        <div className="border-box col-lg-3 col-md-3 col-xs-3 p-3">
                            <div className="text-center">
                                <p className="day"> {forecast.day} </p>
                                <div className="temperature">
                                <img alt="weather" className="weather-icon" src={`icons/${forecast.code}.png`} 
                                    onError={(e) => {
                                        return e.target.onerror = null, e.target.src = 'icons/unknown.png';
                                    }}
                                    />
                                    <div className="">
                                        <div>{forecast.high}&deg;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                })}    
                </div>
                <div className='loader'>
                    {
                    props.loading ? (
                    <ThreeDots height="80"
                    width="80"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass color="#35c4f2"/> ) : ''
                    }
                    
                </div>
            </div>
        </div>

      </div>
    );
}

export default CityWeather;