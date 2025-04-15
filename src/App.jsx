import { useState, useEffect } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState("bg-white");
  const apiKey = "4e507e0e2e8168f45df7a6ffb8aab925";

  const handleSearch = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        alert("City not found");
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setWeatherData(null);
    }
  };

  const getBackgroundClass = () => {
    if (!weatherData) return "bg-white";

    const weatherId = weatherData.list[0].weather[0].id;

    if (weatherId === 800) return "bg-blue-900"; 
    if (weatherId === 801 || (weatherId >= 802 && weatherId <= 804)) return "bg-blue-300";
    if (weatherId >= 500 && weatherId < 600) return "bg-gray-500";
    if (weatherId >= 600 && weatherId < 700) return "bg-blue-100";

    return "bg-white"; 
  };

  useEffect(() => {
    setBackgroundClass(getBackgroundClass());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto"; // العودة للحالة الطبيعية عند الخروج
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <main className={`min-h-screen transition-colors duration-[2000ms] ${backgroundClass}`}>
        <Search onSearch={handleSearch} />
        {weatherData && <CurrentWeather data={weatherData} />}
      </main>
    </div>
  );
}

export default App;
