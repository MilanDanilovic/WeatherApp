import classes from "./WeatherInput.module.css";
const HistoryItem = (props) => {
  return (
    <div className={classes["weather-data"]}>
      <p>
        <span style={{ marginRight: "10px" }}>City: </span>
        {props.historyData.name}
      </p>

      <p className={classes["main-paragrah"]}>
        <span className={classes["main-property-desc"]}>Temperature: </span>
        {props.historyData.main.temp}
        {props.historyData.units === "metric" ? "°C" : "°F"}
      </p>
      <p className={classes["main-paragrah"]}>
        <span className={classes["main-property-desc"]}>Humidity: </span>
        {props.historyData.main.humidity + " %"}{" "}
      </p>
      <p>
        <span className={classes["main-property-desc"]}>Weather status: </span>{" "}
        {props.historyData.weather[0].main}
      </p>
      <p>
        <span className={classes["main-property-desc"]}>Description: </span>
        {props.historyData.weather[0].description}
      </p>
    </div>
  );
};

export default HistoryItem;
