import { useState } from "react";

const WeatherApp = () => {
  let api_key = "2a44a42c2daa7f56e24859f15616908c";

  const [wicon, setWicon] = useState();

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      const humidityElements =
        document.getElementsByClassName("humidity-percent");
      const windElements = document.getElementsByClassName("wind-rate");
      const temperatureElements =
        document.getElementsByClassName("weather-temp");
      const locationElements =
        document.getElementsByClassName("weather-location");

      if (humidityElements.length > 0) {
        humidityElements[0].innerHTML = data.main.humidity + " %";
      }

      if (windElements.length > 0) {
        windElements[0].innerHTML = data.wind.speed + " km/h";
      }

      if (temperatureElements.length > 0) {
        temperatureElements[0].innerHTML = data.main.temp + " °c";
      }

      if (locationElements.length > 0) {
        locationElements[0].innerHTML = data.name;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src="/Assets/search.png" alt="Search" />
        </div>
      </div>
      <div className="weather-image">
        <img src="/Assets/cloud.png" alt="Cloud" className="icon" />
      </div>
      <div className="weather-temp">24° C</div>
      <div className="weather-location">Mendoza</div>
      <div className="data-container">
        <div className="element">
          <img src="/Assets/humidity.png" alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">64 %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src="/Assets/wind.png" alt="wind" className="icon" />
          <div className="data">
            <div className="wind-rate">20 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
