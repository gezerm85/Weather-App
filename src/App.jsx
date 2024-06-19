import { useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  const [city, setcity] = useState("istanbul");

  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=188f5127e8f346689fc110532241706&q=${city}&days=7&aqi=yes&alerts=yes`;

  const { data } = useFetch(apiUrl);

  const handleChange = (event) => {
    const value = event.target.value;
    setcity(value);
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
    <div className="flex flex-col items-center justify-center">
      <h1> Hava Durumu</h1>
      <div className="flex items-center mt-7 gap-5">
        <div>
          <label htmlFor="city">Şehir seç</label>
          <select value={city} onChange={handleChange} name="ctiy" id="city">
            <option value="istanbul">İstanbul</option>
            <option value="ankara">Ankara</option>
            <option value="adana">Adana</option>
            <option value="gaziantep">Gaziantep</option>
          </select>
        </div>
        <div>
          {data && (
            <div className="">
              <p>Şehir: {data.location.name}</p>
              <p>Sıcaklık: {data.current.temp_c}°C</p>
              <p>Hava: {data.current.condition.text}</p>
              <img src={data.current.condition.icon} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-11">
        {data.forecast.forecastday.map((day, index) => (
          <div key={index}>
            <p>{getDayName(day.date)}</p>
            <p>Max: {day.day.maxtemp_c}°C</p>
            <p>Min: {day.day.mintemp_c}°C</p>
            <p>Durum: {day.day.condition.text}</p>
            <img src={day.day.condition.icon} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
