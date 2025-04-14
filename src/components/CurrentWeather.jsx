import HourlyForecast from "./HourlyForecast";

const getWeatherIcon = (id) => {
  if (id < 300) return "storm.svg";
  if (id >= 300 && id < 500) return "drizzle.svg";
  if (id >= 500 && id < 600) return "rain.svg";
  if (id >= 600 && id < 700) return "snow.svg";
  if (id >= 700 && id < 800) return "fog.svg";
  if (id === 800) return "clear.svg";
  if (id === 801) return "partlycloudy.svg";
  if (id >= 801 && id <= 805) return "mostlycloudy.svg";
};

export default function CurrentWeather({ data }) {
  const current = data.list[0];
  const minTemp = Math.min(...data.list.map((entry) => entry.main.temp_min));
  const maxTemp = Math.max(...data.list.map((entry) => entry.main.temp_max));
  const pressure = current.main.pressure;
  const humidity = current.main.humidity;
  const description = current.weather[0].description;
  const icon = getWeatherIcon(current.weather[0].id);

  return (
    <div className="text-[#1c1c54] p-6 rounded-xl mt-6 text-center flex flex-col gap-6">
      <div className="flex flex-col items-center justify-center">
        <img
          src={`/images/weather-icons/${icon}`}
          alt="Weather Icon"
          className="w-46 h-46"
        />
        <p className="text-white text-xl">{description}</p>
      </div>

      <p className="font-medium">
        <span className="text-xl font-semibold tracking-tight mr-2">
          Temperature
        </span>
        <span className="mx-2 text-xl">{Math.round(minTemp)}°</span>
        <span className="text-xl">to</span>
        <span className="mx-2 text-xl">{Math.round(maxTemp)}°C</span>
      </p>

      <div className="mt-2 flex justify-center text-sm gap-4 text-[#1c1c54]">
        <p>
          <span className="font-semibold tracking-tight">Humidity</span>
          <span className="ml-5">{humidity}%</span>
        </p>
        <p>
          <span className="font-semibold tracking-tight">Pressure</span>
          <span className="ml-5">{pressure}</span>
        </p>
      </div>

      <HourlyForecast list={data.list} />
    </div>
  );
}
