import { useState, useReducer } from "react";
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
} from "react-icons/wi";

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
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState("metric");
  const [error, setError] = useState(false);

  const [iconState, dispatchIcon] = useReducer(iconReducer, {
    value: null,
  });

  const searchPressed = async () => {
    const response = await weatherAPI
      .get(`weather?q=${search}&units=${units}`)
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

  const unitChangeHandler = (event) => {
    setWeather("undefined");
    setUnits(event.target.value);
  };

  const weatherDefined =
    typeof weather.main !== "undefined" ? (
      <div className={classes["weather-data"]}>
        {iconState.value}
        <p>
          {"City: "}
          {weather.name}
        </p>

        <p>
          {"Temperature: "}
          {weather.main.temp}
          {units === "metric" ? "°C" : "°F"}
        </p>

        <p>
          {"Weather status:"}
          {weather.weather[0].main}
        </p>
        <p>
          {"Description: "}
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
          placeholder="Enter city/town..."
          onChange={(e) => setSearch(e.target.value)}
          className={classes["input-control-item"]}
        />
        <button
          onClick={searchPressed}
          className={
            classes["input-control-item"] + " " + classes["search-btn"]
          }
        >
          Search
        </button>
        <select
          onChange={unitChangeHandler}
          className={classes["input-control-item"]}
        >
          <option value="metric">Celsius</option>
          <option value="imperial">Farenheit</option>
        </select>
      </div>
      {error && <p>Please provide city name!</p>}
      {!error && weatherDefined}
    </>
  );
};

export default WeatherInput;
