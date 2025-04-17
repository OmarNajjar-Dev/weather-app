/* eslint-disable react/prop-types */
// src/components/TemperatureToggle.jsx
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

export default function TemperatureToggle({ onUnitChange }) {
  const [unit, setUnit] = useState("C"); // C → F → K

  const toggleUnit = () => {
    let newUnit;
    if (unit === "C") newUnit = "F";
    else if (unit === "F") newUnit = "K";
    else newUnit = "C";

    setUnit(newUnit);
    onUnitChange(newUnit);
  };

  return (
    <button
      onClick={toggleUnit}
      className="fixed bottom-4 left-4 bg-blue-700 text-white px-4 py-2 rounded"
    >
      {unit}
    </button>
  );
}
