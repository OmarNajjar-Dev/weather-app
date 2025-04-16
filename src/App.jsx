import { useState } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import LanguageToggle from "./components/LanguageToggle";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "4e507e0e2e8168f45df7a6ffb8aab925";

  // Handle search logic and fetch weather data
  const handleSearch = async (city) => {
    try {
      if (!city) {
        alert("Please enter a city name");
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        alert("City not found");
        setWeatherData(null);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  // Determine background colors based on weather condition
  const getBackgroundColors = (weatherData) => {
    if (!weatherData) {
      // Default colors when there's no data yet
      return {
        mainBg: "bg-[#9ccef4]",
        headerBg: "bg-[#759eda]",
        buttonBg: "bg-[#5879c7]",
      };
    }

    const weatherId = weatherData.list[0].weather[0].id;

    if (weatherId === 800) {
      // Clear weather
      return {
        mainBg: "bg-[#2490e8]",
        headerBg: "bg-[#2070d0]",
        buttonBg: "bg-[#184eb9]",
      };
    } else if (weatherId === 801 || (weatherId >= 802 && weatherId <= 804)) {
      // Cloudy
      return {
        mainBg: "bg-[#9ccef4]",
        headerBg: "bg-[#759eda]",
        buttonBg: "bg-[#5879c7]",
      };
    } else if (weatherId >= 500 && weatherId < 600) {
      // Rainy
      return {
        mainBg: "bg-[#a1bab9]",
        headerBg: "bg-[#6f83ac]",
        buttonBg: "bg-[#4d6192]",
      };
    } else if (weatherId >= 600 && weatherId < 700) {
      // Snowy
      return {
        mainBg: "bg-[#d1e8f8]",
        headerBg: "bg-[#97b6d3]",
        buttonBg: "bg-[#6c8ca1]",
      };
    }

    // Fallback default colors
    return {
      mainBg: "bg-[#9ccef4]",
      headerBg: "bg-[#5879c7]",
      buttonBg: "bg-[#334d7c]",
    };
  };

  // Get the current background colors
  const { mainBg, headerBg, buttonBg } = getBackgroundColors(weatherData);

  return (
    <main className={`min-h-screen transition-colors duration-[3000ms] ${mainBg}`}>
      <Search handleSearch={handleSearch} headerBg={headerBg} buttonBg={buttonBg} />
      {weatherData && <CurrentWeather data={weatherData} />}
      <LanguageToggle />
    </main>
  );
}

export default App;
