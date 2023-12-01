import { useState } from "react";
import clear_icon from "./clear.png";
import cloud_icon from "./cloud.png";
import drizzle_icon from "./drizzle.png";
import rain_icon from "./rain.png";
import snow_icon from "./snow.png";

const WeatherApp = () => {
  let api_key = "2a44a42c2daa7f56e24859f15616908c";

  const [wicon, setWicon] = useState(clear_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let data;

    try {
      let response = await fetch(url);
      data = await response.json();

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
        windElements[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      }

      if (temperatureElements.length > 0) {
        temperatureElements[0].innerHTML = Math.floor(data.main.temp) + " °c";
      }

      if (locationElements.length > 0) {
        locationElements[0].innerHTML = data.name;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Location not found");
      return;
    }

    if (data && data.weather && data.weather.length > 0) {
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } else {
      alert("Location not found");
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
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">20 °c</div>
      <div className="weather-location">Mendoza</div>
      <div className="data-container">
        <div className="element">
          <img src="/Assets/humidity.png" alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">10 %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src="/Assets/wind.png" alt="wind" className="icon" />
          <div className="data">
            <div className="wind-rate">5 km/h</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
