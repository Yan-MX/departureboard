import { query } from "../utility/query";
import getDepartureData  from "../api/getDepartureData";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");


  useEffect(() => {
    async function fetchData() {
    //  console.log("initial data call");
      let responsedata = await getDepartureData(query);
     // console.log(typeof(responsedata));
    //  console.log(responsedata);
      setData(responsedata);
    }
    fetchData();

  }, []);

  return (
    data && 
    <div>
    <div>
      Total number returned: {data.stopPlace.estimatedCalls.length}
    </div>
    {data.stopPlace.estimatedCalls.map((item, index) => (
      <div key={index}>
        <li>Bus No. {item.serviceJourney.journeyPattern.line.publicCode}</li>
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
