import classes from "./ForecastItem.module.css";
import {
  WiThunderstorm,
  WiSleet,
  WiRain,
  WiSnow,
  WiTornado,
  WiDust,
  WiCloudy,
  WiDaySunny,
} from "react-icons/wi";

const setWeatherIcon = (weather) => {
  if (weather === "Thunderstorm") {
    return <WiThunderstorm className={classes["weather-icon"]} />;
  }
  if (weather === "Drizzle") {
    return <WiSleet className={classes["weather-icon"]} />;
  }
  if (weather === "Rain") {
    return <WiRain className={classes["weather-icon"]} />;
  }
  if (weather === "Snow") {
    return <WiSnow className={classes["weather-icon"]} />;
  }
  if (weather === "Clouds") {
    return <WiCloudy className={classes["weather-icon"]} />;
  }
  if (weather === "Clear") {
    return <WiDaySunny className={classes["weather-icon"]} />;
  }
  if (weather === "Tornado") {
    return <WiTornado className={classes["weather-icon"]} />;
  }

  return <WiDust className={classes["weather-icon"]} />;
};

function getDayName(date = new Date(), locale = "en-US") {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

const ForecastItem = (props) => {
  const dayName = getDayName(new Date(props.props.dt_txt));
  const weatherIcon = setWeatherIcon(props.props.weather[0].main);
  return (
    <div className={classes["item-wrapper"]}>
      {weatherIcon}
      <p>{dayName}</p>
      <p>
        {props.props.main.temp}
        {props.units === "metric" ? "°C" : "°F"}
      </p>
    </div>
  );
};

export default ForecastItem;
