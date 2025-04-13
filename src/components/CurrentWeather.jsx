import PropTypes from "prop-types";
{/* <img
  // eslint-disable-next-line no-undef
  src={`/images/weather-icons/${icon}`}
  alt="Weather Icon"
  className="w-32 h-32 mb-2"
/> */}

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

export default function CurrentWeather({ data }) {
  if (!data || !data.list || data.list.length === 0) {
    return <div className="text-center text-gray-600 mt-4">No data available</div>;
  }

  const city = data.city.name;
  const current = data.list[0];
  const minTemp = Math.min(...data.list.map((entry) => entry.main.temp_min));
  const maxTemp = Math.max(...data.list.map((entry) => entry.main.temp_max));
  const pressure = current.main.pressure;
  const humidity = current.main.humidity;
  const description = current.weather[0].description;
  const icon = getWeatherIcon(current.weather[0].id);

  return (
    <div className="bg-[#add8f7] text-[#1c1c54] p-6 rounded-xl mt-6 text-center">
      {/* المدينة والبحث */}
      <h2 className="text-2xl font-light mb-4">{city}</h2>

      {/* أيقونة الطقس الرئيسية */}
      <div className="flex flex-col items-center justify-center mb-4">
        <img
          src={`/images/weather-icons/${icon}`}
          alt="Weather Icon"
          className="w-32 h-32 mb-2"
        />
        <p className="text-white text-lg capitalize">{description}</p>
      </div>

      {/* درجة الحرارة */}
      <p className="text-lg font-semibold">
        <span className="text-xl font-bold">Temperature</span> {Math.round(minTemp)}° to {Math.round(maxTemp)}°C
      </p>

      {/* الرطوبة والضغط */}
      <div className="mt-2 flex justify-center gap-4 text-sm text-[#1c1c54]">
        <p>
          <span className="font-bold">Humidity</span> {humidity}%
        </p>
        <p>
          <span className="font-bold">Pressure</span> {pressure}
        </p>
      </div>

      {/* توقعات الساعات القادمة */}
      <div className="flex justify-center mt-6 overflow-x-auto gap-4">
        {data.list.map((entry, index) => {
          const hour = new Date(entry.dt * 1000).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const iconSmall = getWeatherIcon(entry.weather[0].id);
          const temp = Math.round(entry.main.temp);
          return (
            <div key={index} className="flex flex-col items-center min-w-[60px]">
              <p className="text-sm">{hour}</p>
              <img
                src={`/images/weather-icons/${iconSmall}`}
                alt="icon"
                className="w-10 h-10 my-1"
              />
              <p className="text-sm">{temp}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
          temp_min: PropTypes.number,
          temp_max: PropTypes.number,
          humidity: PropTypes.number.isRequired,
          pressure: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired
    ).isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
