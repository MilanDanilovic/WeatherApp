import WeatherInput from "../components/WeatherInput";

const Home = () => {
  return (
    <div className="App">
      <section className="main-section">
        <h1 className="h1-weather">Weather App</h1>
        <WeatherInput />
      </section>
    </div>
  );
};

export default Home;
