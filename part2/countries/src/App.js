import { useEffect, useState } from "react";
import axios from "axios";
//components
import Countries from "./components/countries";

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  function fetchData() {
    const name = searchCountry;
    if (name !== "") {
      try{
      const res = axios.get(`https://restcountries.com/v3.1/name/${name}`);
      res.then((res) => {
        const filteredCountries = res.data.map((r) => {
          return r;
        });
        setCountries(filteredCountries);
        if (filteredCountries.length === 1) {
          getWeatherData(countries[0].name.common);
        }
      });
      }catch(e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchCountry]);

  const getWeatherData = (cityName) => {
    
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
    .then((res) => {
      setWeatherData(res.data);
    }).catch((error) => {
      console.log(error)
    })

  }

  return (
    <div>
      Find Countries
      <input
        type="text"
        value={searchCountry}
        onChange={(event) => setSearchCountry(event.target.value)}
      />
      {searchCountry !== "" ? (
        <Countries countries={countries} weatherData={weatherData} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
