import { useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  const [city, setCity] = useState("ankara");

  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=188f5127e8f346689fc110532241706&q=${city}&days=7&aqi=yes&alerts=yes`;

  const { data } = useFetch(apiUrl);

  const handleChange = (event) => {
    const value = event.target.value;
    setCity(value);
    console.log("Seçilen değer:", value);
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    return days[date.getDay()];
  };

  return (
    <div className="weather-app text-center">
      <h1 className="text-3xl font-bold mb-5">Hava Durumu</h1>
      <div className="city-select mb-5">
        <label htmlFor="city" className="mr-2 font-bold">
          Şehir seç
        </label>
        <select
          value={city}
          onChange={handleChange}
          name="city"
          id="city"
          className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="istanbul">İstanbul</option>
          <option value="ankara">Ankara</option>
          <option value="adana">Adana</option>
          <option value="gaziantep">Gaziantep</option>
        </select>
      </div>
      <div className="flex gap-5 justify-center">
        {data &&
          data.forecast &&
          data.forecast.forecastday &&
          data.forecast.forecastday.map((day, index) => (
            <div
              key={index}
              className={`bg-blue-100 p-4 rounded-md flex flex-col items-center ${
                index === 0 ? "bg-yellow-200" : ""
              }`}
            >
              <p className="font-semibold">{getDayName(day.date)}</p>
              <p>Max: {day.day.maxtemp_c}°C</p>
              <p>Min: {day.day.mintemp_c}°C</p>
              <p>Durum: {day.day.condition.text}</p>
              <img
                width={80}
                height={80}
                src={day.day.condition.icon}
                alt="weather condition"
                className="mt-2"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
