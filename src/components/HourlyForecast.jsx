/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

export default function HourlyForecast({ list, getWeatherIcon, unit }) {
  const convertTemp = (temp) => {
    if (unit === "F") return Math.round((temp * 9) / 5 + 32);
    if (unit === "K") return Math.round(temp + 273.15);
    return Math.round(temp);
  };

  return (
    <div className="flex flex-wrap justify-center mt-14 gap-10">
      {list.map((entry, index) => {
        const hour = new Date(entry.dt * 1000).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const iconSmall = getWeatherIcon(entry.weather[0].id);
        const temp = convertTemp(entry.main.temp);

        return (
          <div key={index} className="flex flex-col gap-3">
            <p className="text-sm">{hour}</p>
            <img
              src={`/images/weather-icons/${iconSmall}`}
              alt="icon"
              className="w-18 h-18 my-1 sm:w-20 sm:h-20"
            />
            <p className="text-sm">{temp}°{unit}</p>
          </div>
        );
      })}
    </div>
  );
}
