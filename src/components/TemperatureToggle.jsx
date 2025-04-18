/* eslint-disable react/prop-types */
// src/components/TemperatureToggle.jsx

// eslint-disable-next-line no-unused-vars
import { useState } from "react";

export default function TemperatureToggle({ onUnitChange }) {
  const units = ["C", "F", "K"];
  const [index, setIndex] = useState(0);

  const toggleUnit = () => {
    const newIndex = (index + 1) % units.length;
    setIndex(newIndex);
    onUnitChange(units[newIndex]);
  };

  return (
    <button
      onClick={toggleUnit}
      className="fixed bottom-4 left-4 bg-blue-700 text-white px-4 py-2 rounded"
    >
      {units[index]}
    </button>
  );
}
