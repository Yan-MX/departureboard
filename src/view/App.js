import { query } from "../utilities/query";
import getDepartureData from "../api&service/getDepartureData";
import React, { useState, useEffect, useRef } from "react";
import { Queue } from "../utilities/queue";
import delay from "../utilities/utility";

function App() {
  const [data, setData] = useState("");
  const isQueued = useRef(false);


  useEffect(() => {
    let requestQueue = new Queue();
    async function fetchData() {
      if (!isQueued.current) {
        if (requestQueue.length === 0) {
          isQueued.current = true;
          await delay(5000);
          let responsedata = await getDepartureData(query);
          isQueued.current = false;
          setData(responsedata);
        } else {
          let lastquery = requestQueue.peekTail;
          requestQueue.emptyQueue();
          console.log("queue cleared")
          isQueued.current = true;
          await delay(5000);
          let responsedata = await getDepartureData(lastquery);
          isQueued.current = false;
          setData(responsedata);
        }
      } else {
        requestQueue.enqueue(query);
        console.log("added one query to requestQueue");
        console.log("requestQueue length: "+requestQueue.length);
      }
    }
    const interval = setInterval(() => fetchData(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    data &&
    data.stopPlace && (
      <div>
        <div>Total number returned: {data.stopPlace.estimatedCalls.length}</div>
        {data.stopPlace.estimatedCalls.map((item, index) => (
          <div key={index}>
            <li>
              Bus No. {item.serviceJourney.journeyPattern.line.publicCode}
            </li>
            <li>Destination: {item.destinationDisplay.frontText}</li>
            <li>Aimed: {item.aimedArrivalTime}</li>
            <li>Expected: {item.expectedArrivalTime}</li>

            <span>----------</span>
          </div>
        ))}
      </div>
    )
  );
}

export default App;
