import { useState } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "4e507e0e2e8168f45df7a6ffb8aab925";

  const handleSearch = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&units=metric&appid=${apiKey}`
      );

      if (!response.ok) alert("City not found");

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#a3d4f7] font-sans">
      <Search onSearch={handleSearch} />
      {weatherData && <CurrentWeather data={weatherData} />}
    </div>
  );
}

export default App;
