import axios from "axios";
async function getWeather(lat: string, lon: string, date: string) {
  const options = {
    method: "GET",
  url: "https://ai-weather-by-meteosource.p.rapidapi.com/time_machine",
    params: {
      lat: lat,
      lon: lon,
      date: date,
      units: "auto",
  },
  headers: {
    "x-rapidapi-key": "cf2651e6d4msh20d179562e563c1p11409cjsn9c42516909b4",
    "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
export default getWeather;