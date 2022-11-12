import { query } from "../utility/query";
import getDepartureData  from "../api&service/getDepartureData";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");


  useEffect(() => {
    async function fetchData() {
      console.log("fetch data called");
       let responsedata = await getDepartureData(query);
       setData(responsedata);
     }
    const interval = setInterval(() =>fetchData(),
    5000);
 
    return () => clearInterval(interval);

  }, []);

  return (
    data && data.stopPlace &&
    <div>
    <div>
      Total number returned: {data.stopPlace.estimatedCalls.length}
    </div>
    {data.stopPlace.estimatedCalls.map((item, index) => (
      <div key={index}>
        <li>Buss No. {item.serviceJourney.journeyPattern.line.publicCode}</li>
        <li>Destination: {item.destinationDisplay.frontText}</li>
        <li>Aimed: {item.aimedArrivalTime}</li>
        <li>Expected: {item.expectedArrivalTime}</li>
      
        <span>----------</span>
      </div>
    ))}
  </div>
  );
}

export default App;
