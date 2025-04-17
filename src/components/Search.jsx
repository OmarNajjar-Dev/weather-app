import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Search({ handleSearch }) {
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
    <header className="bg-[#9ccef4] p-5 shadow-sm transition-colors duration-[3000ms]">
      <div className="container flex items-center justify-between md:justify-start gap-5">
        <input
          type="text"
          name="city"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
          className="text-lg md:text-xl max-w-[40%] py-2 outline-none border-b border-none focus:border-solid border-[#090c51] text-white bg-transparent"
          placeholder="Type in a city name"
        />
        <button
          className="bg-[#5879c7] text-md md:text-lg text-[#171f66] py-2 px-5 rounded-sm tracking-tight cursor-pointer"
          onClick={() => handleSearch(city)}
        >
          FIND WEATHER
        </button>
      </div>
    </header>
  );
}
