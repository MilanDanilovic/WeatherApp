import { useState } from "react";
import axios from "axios";
import classes from "./WeatherInput.module.css";
import {
  WiThunderstorm,
  WiSleet,
  WiRain,
  WiSnow,
  WiTornado,
  WiThermometer,
} from "react-icons/wi";

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
    }
  };

  const unitChangeHandler = (event) => {
    setWeather("undefined");
    setUnits(event.target.value);
  };

  const weatherDefined =
    typeof weather.main !== "undefined" ? (
      <div className={classes["weather-data"]}>
        <WiThunderstorm className={classes["weather-icon"]} />
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
