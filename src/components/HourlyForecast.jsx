import React from "react";

const getWeatherIcon = (id) => {
  if (id >= 200 && id < 300) return "storm.svg";
  if (id >= 300 && id < 500) return "drizzle.svg";
  if (id >= 500 && id < 600) return "rain.svg";
  if (id >= 600 && id < 700) return "snow.svg";
  if (id >= 700 && id < 800) return "fog.svg";
  if (id === 800) return "clear.svg";
  if (id > 800) return "partlycloudy.svg";
  return "mostlycloudy.svg";
};

export default function HourlyForecast({ list }) {
  return (
    <div className="flex justify-center mt-14 overflow-x-auto gap-10">
      {list.map((entry, index) => {
        const hour = new Date(entry.dt * 1000).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const iconSmall = getWeatherIcon(entry.weather[0].id);
        const temp = Math.round(entry.main.temp);

        return (
          <div key={index} className="flex flex-col gap-4">
            <p className="text-sm">{hour}</p>
            <img
              src={`/images/weather-icons/${iconSmall}`}
              alt="icon"
              className="w-18 h-18 my-1"
            />
            <p className="text-sm">{temp}°C</p>
          </div>
        );
      })}
    </div>
  );
}
