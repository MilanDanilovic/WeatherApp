import ForecastItem from "./ForecastItem";
import classes from "./Forecast.module.css";

function getDayName(date = new Date(), locale = "en-US") {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

const Forecast = (props) => {
  if (props.forecast.list) {
    const forecastItems = [];
    let temperature = props.forecast.list[0].main.temp;
    let dayName = getDayName(new Date(props.forecast.list[0].dt_txt));
    let j = 0;
    for (let i = 1; i < props.forecast.list.length; i++) {
      temperature += props.forecast.list[i].main.temp;
      j++;
      let currentDay = getDayName(new Date(props.forecast.list[i].dt_txt));
      if (dayName !== currentDay || i === props.forecast.list.length - 1) {
        let forecastItem = props.forecast.list[i - 1];
        forecastItem.main.temp = (temperature / j).toFixed(2);
        forecastItems.push(
          <ForecastItem
            key={forecastItem.dt}
            props={forecastItem}
            units={props.units}
          />
        );
        temperature = 0;
        j = 0;
        dayName = currentDay;
      }
    }
    return <div className={classes["forecast-wrapper"]}>{forecastItems}</div>;
  }
  return <div>{}</div>;
};

export default Forecast;
