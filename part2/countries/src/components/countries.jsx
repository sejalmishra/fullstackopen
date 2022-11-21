import { useState } from "react";

function Countries({ countries, weatherData }) {
  const [isCountryDetail, setCountryDetail] = useState(false);
  const [viewCountry, setViewCountry] = useState({});

  const manageView = (data) => {
    setCountryDetail(true);
    setViewCountry(data);
  };

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>capital {countries[0].capital[0]}</p>
        <p>area {countries[0].area}</p>
        <h2>Languages:</h2>
        {Object.values(countries[0].languages).map((value, i) => (
          <li key={i}>
            <span>{value}</span>
          </li>
        ))}
        <img src={countries[0].flags.png} />

        <h2>Weather in {countries[0].capital[0]}</h2>
        <p>temprature - {weatherData?.main?.temp} Celcius</p>
        {weatherData.weather ? <img
          src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
        /> : ""}
        <p>wind - {weatherData?.wind?.speed} m/s</p>
      </div>
    );
  }

  return (
    <div>
      {countries.map((country) => {
        return (
          <p key={country.name.common}>
            <b>{country.name.common}</b> with official name{" "}
            {country.name.official}
            <button onClick={() => manageView(country)}>show</button>
          </p>
        );
      })}
      {isCountryDetail && (
        <div>
          <h1>{viewCountry.name.common}</h1>
          <p>capital {viewCountry.capital[0]}</p>
          <p>area {viewCountry.area}</p>
          <h2>Languages:</h2>
          {Object.values(viewCountry.languages).map((value, i) => (
            <li key={i}>
              <span>{value}</span>
            </li>
          ))}
          <img src={viewCountry.flags.png} />
        </div>
      )}
    </div>
  );
}

export default Countries;
