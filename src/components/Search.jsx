import { useState } from "react";

export default function Search({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") return;
    onSearch(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="bg-[#759eda] fixed px-12 py-5 z-10 top-0 left-0 right-0 shadow-sm">
      <div className="container flex items-center gap-5">
        <input
          type="text"
          name="city"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCity(e.target.value)}
          className="text-xl py-2 outline-none border-b border-none focus:border-solid border-[#090c51] text-white"
          placeholder="Type in a city name"
        />
        <button
          className="text-lg bg-[#5879c7] text-[#171f66] py-2 px-5 rounded-sm tracking-tight cursor-pointer"
          onClick={handleSearch}
        >
          FIND WEATHER
        </button>
      </div>
    </header>
  );
}
