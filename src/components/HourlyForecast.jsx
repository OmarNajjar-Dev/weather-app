import React from "react";

export default function HourlyForecast({ list, getWeatherIcon}) {
  return (
    <div className="flex flex-wrap justify-center mt-14 gap-10">
      {list.map((entry, index) => {
        const hour = new Date(entry.dt * 1000).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const iconSmall = getWeatherIcon(entry.weather[0].id);
        const temp = Math.round(entry.main.temp);

        return (
          <div key={index} className="flex flex-col gap-3">
            <p className="text-sm">{hour}</p>
            <img
              src={`/images/weather-icons/${iconSmall}`}
              alt="icon"
              className="w-18 h-18 my-1 sm:w-20 sm:h-20"
            />
            <p className="text-sm">{temp}°C</p>
          </div>
        );
      })}
    </div>
  );
}
