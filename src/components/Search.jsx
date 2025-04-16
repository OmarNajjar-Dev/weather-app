import { useEffect, useState } from "react";

export default function Search({ handleSearch, headerBg, buttonBg }) {
  const [city, setCity] = useState("tripoli");

  useEffect(() => {
    handleSearch(city);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(city);
    }
  };

  return (
    <header
      className={`${headerBg} p-5 shadow-sm transition-colors duration-[3000ms]`}
    >
      <div className="container flex items-center justify-between md:justify-start gap-5">
        <input
          type="text"
          name="city"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
          className="text-lg md:text-xl max-w-[40%] py-2 outline-none border-b border-none focus:border-solid border-[#090c51] text-white bg-transparent"
          placeholder="Type in a city name"
          data-key="placeholder_search"
        />
        <button
          className={`${buttonBg} text-md md:text-lg text-[#171f66] py-2 px-5 rounded-sm tracking-tight cursor-pointer whitespace-nowrap transition-colors duration-[3000ms]`}
          onClick={() => handleSearch(city)}
          data-key="btn_search"
        >
          FIND WEATHER
        </button>
      </div>
    </header>
  );
}
