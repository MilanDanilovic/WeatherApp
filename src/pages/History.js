import { useState, useEffect } from "react";
import HistoryItem from "../components/HistoryItem";
import classes from "./History.module.css";
import Lottie from "lottie-react";
import noHistory from "../assets/noHistory.json";

const History = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteHistory = () => {
    localStorage.removeItem("weather");
    setWeatherData([]);
    setIsEmpty(true);
  };

  useEffect(() => {
    const weatherItems = JSON.parse(localStorage.getItem("weather"));
    if (Array.isArray(weatherItems)) {
      setWeatherData(weatherItems);
      setIsEmpty(false);
    }
  }, []);
  const historyItems = weatherData
    .slice(0)
    .reverse()
    .map((weather) => <HistoryItem key={weather.dt} historyData={weather} />);
  return (
    <div className={classes["history-wrapper"]}>
      {!isEmpty && (
        <button
          className={
            classes["input-control-item"] + " " + classes["search-btn"]
          }
          onClick={deleteHistory}
        >
          Clear history
        </button>
      )}
      {isEmpty && <Lottie loop={false} animationData={noHistory} />}
      {historyItems}
    </div>
  );
};

export default History;
