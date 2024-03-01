//-- test start -- single ...



// import { useState } from "react";

// function Weather(){
//    var [weather,setWeather] = useState({
//         "date":"",
//         "temperatureC":0,
//         "temperatureF":0,
//         "summary":""
//     });
//     var callAPI = ()=>{
//         fetch("http://localhost:5146/WeatherForecast")
//         .then(res=>res.json())
//         .then(res=>{
//             console.log(res);
//             setWeather(res[0])
//         });
//     }
    
//     return(
        
//         <div>
//             <button onClick={callAPI}>Call API</button>
//             <div>
//                 Date : {weather.date}
//                 <br/>
//                 Temperature in Celcius : {weather.temperatureC}
//                 <br/>
//                 Summary : {weather.summary}
//             </div>
//         </div>
//     );
// }

// export default Weather;


//-- test start -- using map 


import { useState } from "react";

function Weather(){
   var [weathers,setWeathers] = useState([{
        "date":"",
        "temperatureC":0,
        "temperatureF":0,
        "summary":""
    }]);
    var callAPI = ()=>{
        fetch("http://localhost:5146/WeatherForecast")
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            <br />
            setWeathers(res)
        });
    }
    
    return(
        
        <div>
            <button onClick={callAPI}>Call API</button>
            {weathers.map((weather)=>
                <div key={weather.temperatureC} >
                    <h2>Date : {weather.date}</h2>
                    <br/>
                    Temperature in Celcius : {weather.temperatureC}
                    <br/>
                    Summary : {weather.summary}
                    <hr/>
                </div>
            )}

            {/* <div >
                Date : {weather.date}
                <br/>
                Temperature in Celcius : {weather.temperatureC}
                <br/>
                Summary : {weather.summary}
            </div> */}
        </div>
    );
}

export default Weather;