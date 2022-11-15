import { query } from "../utilities/query";

const getDepartureData = async () => {
  console.log("API fetch data called");
  try {
    const response = await fetch(
      "https://api.entur.io/journey-planner/v3/graphql",
      {
        method: "POST",
        headers: {
          "ET-Client-Name": "yan-journeyplanner",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      return result.data;
    }else {
      //should add error handling
      return null;
    }
  } catch(error){
    console.log(error.message);
    return null; // network error
  }
};
export default getDepartureData;
