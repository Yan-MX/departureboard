import { query } from "../utilities/query";
import getDepartureData  from "../api&service/getDepartureData";
import React, { useState, useEffect } from "react";
import {Queue} from "../utilities/queue"
import delay from "../utilities/utility";

function App() {
  const [data, setData] = useState("");
  const [isFirstQuery,setIsFirstQuery]=useState(true);
  const [isQueueing,setIsQueueing]=useState(false);
  let isQueued = false;
  let requestQueue = new Queue();
  

  useEffect(() => {
    async function fetchData() {
       if(!isQueued){
        isQueued =true;
        await delay(30000);
        let responsedata = await getDepartureData(query);
        isQueued=false;
        setData(responsedata);
       }else{
        console.log("queued");
       }
     
     }
    const interval = setInterval(() => fetchData(),
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
