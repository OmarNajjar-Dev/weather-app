import { useState } from "react";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import LanguageToggle from "./components/LanguageToggle";
import TemperatureToggle from "./components/TemperatureToggle";
import useLocalStorage from "./hooks/useLocalStorage";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

function AppContent() {
  const [weatherData, setWeatherData] = useLocalStorage("weather", null);
  const [unit, setUnit] = useState("C");
  const { language } = useLanguage();

  const apiKey = "4e507e0e2e8168f45df7a6ffb8aab925";

  const handleSearch = async (city) => {
    try {
      // Use Arabic language parameter when language is set to Arabic
      const langParam = language === "ar" ? "&lang=ar" : "";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&units=metric&appid=${apiKey}${langParam}`
      );
      if (!response.ok) {
        alert("City not found. Please try again.");
        setWeatherData(null);
        return;
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  const getBackgroundColors = (weatherData) => {
    if (!weatherData) {
      return {
        mainBg: "bg-[#9ccef4]",
        headerBg: "bg-[#759eda]",
        buttonBg: "bg-[#5879c7]",
      };
    }

    const weatherId = weatherData.list[0].weather[0].id;
    if (weatherId === 800) {
      return {
        mainBg: "bg-[#2490e8]",
        headerBg: "bg-[#2070d0]",
        buttonBg: "bg-[#184eb9]",
      };
    } else if (weatherId === 801 || (weatherId >= 802 && weatherId <= 804)) {
      return {
        mainBg: "bg-[#9ccef4]",
        headerBg: "bg-[#759eda]",
        buttonBg: "bg-[#5879c7]",
      };
    } else if (weatherId >= 500 && weatherId < 600) {
      return {
        mainBg: "bg-[#a1bab9]",
        headerBg: "bg-[#6f83ac]",
        buttonBg: "bg-[#4d6192]",
      };
    } else if (weatherId >= 600 && weatherId < 700) {
      return {
        mainBg: "bg-[#d1e8f8]",
        headerBg: "bg-[#97b6d3]",
        buttonBg: "bg-[#6c8ca1]",
      };
    }

    return {
      mainBg: "bg-[#9ccef4]",
      headerBg: "bg-[#5879c7]",
      buttonBg: "bg-[#334d7c]",
    };
  };

  const { mainBg, headerBg, buttonBg } = getBackgroundColors(weatherData);

  return (
    <main
      className={`min-h-screen transition-colors duration-[3000ms] ${mainBg}`}
    >
      <Search
        handleSearch={handleSearch}
        headerBg={headerBg}
        buttonBg={buttonBg}
      />
      {weatherData && <CurrentWeather data={weatherData} unit={unit} />}
      <LanguageToggle />
      <TemperatureToggle onUnitChange={setUnit} />
    </main>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
