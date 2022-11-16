import { query } from "../utilities/query";
import getDepartureData from "../api&service/getDepartureData";
import React, { useState, useEffect, useRef } from "react";
import { Queue } from "../utilities/queue";
import { getDelayedMins, delay, getArrivalTime } from "../utilities/utility";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BlinkedBox = styled("div")({
  backgroundColor: "red",
  width: 25,
  height: 25,
  borderRadius: 50,
  animation: `${blink} 1s linear infinite`,
  alignSelf: "center",
});

const InfoRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignSelf: "center",
});
const IconWrapper = styled("div")({
  alignSelf: "center",
});

const Text = styled("p")({
  fontFamily: "sans-serif",
  fontSize: "large",
  wordWrap: "break-word",
  whiteSpace: "initial",
});
const DestinationText = styled("p")({
  fontFamily: "sans-serif",
  fontSize: "large",
  wordWrap: "break-word",
  whiteSpace: "initial",
  width: "40%",
});

function App() {
  const [data, setData] = useState("");
  //isQueued is true when the previous api is still waiting for response
  const isQueued = useRef(false);
  let currentTime = new Date();

  useEffect(() => {
    //create a new queue
    let requestQueue = new Queue();
    // to call the API and fetch data
    async function fetchData() {
      //if there is no queue, namely no previous API calls waiting for responses
      if (!isQueued.current) {
        // if there is no request in the queue, namely the first time we fire the API call
        if (requestQueue.length === 0) {
          await getData(query);
        } else {
          //if there is already requests in the queue, we retrieve the last request in the queue and then empty the queue
          let lastquery = requestQueue.peekTail;
          requestQueue.emptyQueue();
          console.log("queue cleared");
          await getData(lastquery);
        }
      } else {
        //there is a queue, add the query in the queue
        requestQueue.enqueue(query);
        console.log("added one query to requestQueue");
        console.log("requestQueue length: " + requestQueue.length);
      }
    }
    //API call attempts every second
    const interval = setInterval(() => fetchData(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    data &&
    data.stopPlace && (
      <div>
        <h2>Jernbanetorget</h2>
        {data.stopPlace.estimatedCalls.map((item, index) => (
          <InfoRow key={index}>
            <IconWrapper>
              <DirectionsBusIcon />
            </IconWrapper>
            <Text>{item.serviceJourney.journeyPattern.line.publicCode}</Text>
            <DestinationText>
              {item.destinationDisplay.frontText}
            </DestinationText>
            <Text>{getArrivalTime(item.expectedArrivalTime, currentTime)}</Text>
            {getDelayedMins(item.expectedArrivalTime, item.aimedArrivalTime) >
            0 ? (
              <BlinkedBox />
            ) : (
              ""
            )}
          </InfoRow>
        ))}
      </div>
    )
  );

  async function getData(query) {
    isQueued.current = true;
    await delay(5000);
    let responsedata = await getDepartureData(query);
    isQueued.current = false;
    if (responsedata != null) {
      setData(responsedata);
    }
  }
}

export default App;
