import { useState, useReducer, useRef } from "react";
import axios from "axios";
import classes from "./WeatherInput.module.css";
import {
  WiThunderstorm,
  WiSleet,
  WiRain,
  WiSnow,
  WiTornado,
  WiThermometer,
  WiDust,
  WiCloudy,
  WiDaySunny,
  WiHumidity,
} from "react-icons/wi";
import Forecast from "./Forecast";

const iconReducer = (state, action) => {
  if (action.type === "Thunderstorm") {
    return { value: <WiThunderstorm className={classes["weather-icon"]} /> };
  }
  if (action.type === "Drizzle") {
    return { value: <WiSleet className={classes["weather-icon"]} /> };
  }
  if (action.type === "Rain") {
    return { value: <WiRain className={classes["weather-icon"]} /> };
  }
  if (action.type === "Snow") {
    return { value: <WiSnow className={classes["weather-icon"]} /> };
  }
  if (action.type === "Clouds") {
    return { value: <WiCloudy className={classes["weather-icon"]} /> };
  }
  if (action.type === "Clear") {
    return { value: <WiDaySunny className={classes["weather-icon"]} /> };
  }
  if (action.type === "Tornado") {
    return { value: <WiTornado className={classes["weather-icon"]} /> };
  }

  return { value: <WiDust className={classes["weather-icon"]} /> };
};

export const weatherAPI = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: "ff8147db2eba72890d23b7b07994cf19",
  },
});

const WeatherInput = () => {
  const search = useRef();
  const [weather, setWeather] = useState({});
  const units = useRef();
  const [error, setError] = useState(false);
  const [forecast, setForecast] = useState({});
  const [iconState, dispatchIcon] = useReducer(iconReducer, {
    value: null,
  });

  const fetchWeatherData = async () => {
    const response = await weatherAPI
      .get(`weather?q=${search.current.value}&units=${units.current.value}`)
      .catch((error) => {
        setError(true);
      });

    if (response) {
      const responseData = await response.data;
      setWeather(responseData);
      setError(false);
      dispatchIcon({ type: responseData.weather[0].main });
    }
  };

  const fetchForecastData = async () => {
    const response = await weatherAPI
      .get(`forecast?q=${search.current.value}&units=${units.current.value}`)
      .catch((error) => {
        setError(true);
      });
    if (response) {
      const responseData = await response.data;
      setForecast(responseData);
      setError(false);
    }
  };

  const fetchData = async () => {
    fetchWeatherData();
    fetchForecastData();
  };

  const weatherDefined =
    typeof weather.main !== "undefined" ? (
      <div className={classes["weather-data"]}>
        {iconState.value}
        <p>
          <span style={{ marginRight: "10px" }}>City: </span>
          {weather.name}
        </p>

        <p className={classes["main-paragrah"]}>
          <span className={classes["main-property-desc"]}>Temperature: </span>
          {weather.main.temp}
          {units.current.value === "metric" ? "°C" : "°F"}
          <WiThermometer className={classes["inline-weather-icon"]} />
        </p>
        <p className={classes["main-paragrah"]}>
          <span className={classes["main-property-desc"]}>Humidity: </span>
          {weather.main.humidity + " %"}{" "}
          <WiHumidity className={classes["inline-weather-icon"]} />
        </p>
        <p>
          <span className={classes["main-property-desc"]}>
            Weather status:{" "}
          </span>{" "}
          {weather.weather[0].main}
        </p>
        <p>
          <span className={classes["main-property-desc"]}>Description: </span>
          {weather.weather[0].description}
        </p>
      </div>
    ) : (
      ""
    );

  return (
    <>
      <div className={classes["input-controls"]}>
        <input
          type="text"
          placeholder="Enter city or town"
          ref={search}
          className={classes["input-control-item"]}
        />
        <button
          onClick={fetchData}
          className={
            classes["input-control-item"] + " " + classes["search-btn"]
          }
        >
          Search
        </button>
        <select ref={units} className={classes["input-control-item"]}>
          <option value="metric">Celsius</option>
          <option value="imperial">Farenheit</option>
        </select>
      </div>
      {error && <p>Please provide city name!</p>}
      {!error && weatherDefined}
      {!error && (
        <Forecast
          forecast={forecast}
          units={units.current ? units.current.value : ""}
        />
      )}
    </>
  );
};

export default WeatherInput;
