import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Search({ handleSearch, headerBg, buttonBg }) {
  const [city, setCity] = useState("Tripoli");

  useEffect(() => {
    handleSearch(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(city);
    }
  };

  return (
    <header
      className={`p-5 shadow-sm transition-colors duration-[3000ms] ${headerBg}`}
    >
      <div className="container flex items-center justify-between md:justify-start gap-5">
        <input
          type="text"
          name="city"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
          className="text-lg md:text-xl max-w-[40%] py-2 outline-none border-b border-transparent focus:border-[#090c51] text-white transition-all duration-300"
          placeholder="Type in a city name"
        />
        <button
          className={`text-md md:text-lg text-[#171f66] py-2 px-5 rounded-sm tracking-tight cursor-pointer transition-colors duration-[3000ms] ${buttonBg}`}
          onClick={() => handleSearch(city)}
        >
          FIND WEATHER
        </button>
      </div>
    </header>
  );
}
