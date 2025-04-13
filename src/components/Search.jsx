import { useState } from "react";

export default function Search({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") return;
    onSearch(city);
    setCity("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 bg-[#7a9cc6] p-6">
      <input
        type="text"
        placeholder="Type in a city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-b border-white placeholder-white text-white focus:outline-none px-2 py-1 w-1/3 text-lg"
      />
      <button
        onClick={handleSearch}
        className="bg-[#4b5c88] text-white px-6 py-2 font-semibold rounded shadow hover:bg-[#3e4e73]"
      >
        FIND WEATHER
      </button>
    </div>
  );
}
