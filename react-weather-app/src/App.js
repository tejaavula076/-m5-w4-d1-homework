import React, { useState, useEffect } from "react";
import "./App.css";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import "bootstrap/dist/css/bootstrap.min.css";

countries.registerLocale(en);

function App() {

const [apiData, setApiData] = useState({});
const [getState, setGetState] = useState("Irvine");
const [state, setState] = useState("Irvine");

const apiKey = process.env.REACT_APP_API_KEY;

const apiUrl =
"https://api.openweathermap.org/data/2.5/weather?q=" +
state +
"&appid=" +
apiKey;

useEffect(() => {
fetch(apiUrl)
.then((res) => res.json())
.then((data) => {
setApiData(data);
});
}, [apiUrl]);

const inputHandler = (event) => {
setGetState(event.target.value);
};

const submitHandler = () => {
setState(getState);
};

const kelvinToFarenheit = (k) => {
return ((k - 273.15) * 1.8 + 32).toFixed(0);
};

return (

<div className="App">

<header className="d-flex justify-content-center align-items-center">
<h2>React Weather App</h2>
</header>

<div className="container">

<div className="d-flex flex-column justify-content-center align-items-center">

<div className="col-auto">
<label className="col-form-label">
Enter Location :
</label>
</div>

<div className="col-auto">
<input
type="text"
className="form-control"
onChange={inputHandler}
value={getState}
/>
</div>

<div className="col-auto">
<button
className="btn btn-primary mt-2"
onClick={submitHandler}
>
Search
</button>
</div>

</div>

<div className="card mt-3 mx-auto">

{apiData.main ? (

<div className="card-body text-center">

<img
src={`https://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
alt="weather icon"
className="weather-icon"
/>

<p className="h2">
{kelvinToFarenheit(apiData.main.temp)}°F
</p>

<p className="h5">
📍 <strong>{apiData.name}</strong>
</p>

<div className="row mt-4">

<div className="col-md-6">

<p>
🔵 <strong>
{kelvinToFarenheit(apiData.main.temp_min)}°F
</strong>
</p>

<p>
🔴 <strong>
{kelvinToFarenheit(apiData.main.temp_max)}°F
</strong>
</p>

</div>

<div className="col-md-6">

<p>
<strong>
{apiData.weather[0].main}
</strong>
</p>

<p>
<strong>
{countries.getName(
apiData.sys.country,
"en",
{ select:"official"}
)}
</strong>
</p>

</div>

</div>

</div>

) : (

<h1>Loading...</h1>

)}

</div>

</div>

<footer className="footer">
© React Weather App
</footer>

</div>

);
}

export default App;