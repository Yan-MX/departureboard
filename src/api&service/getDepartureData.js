import { query } from "../utilities/query";

const getDepartureData = async () => {
  console.log("fetch data called");
  try {
    const response = await fetch(
      "https://api.entur.io/journey-planner/v2/graphql",
      {
        method: "POST",
        headers: {
          "ET-Client-Name": "yan-journeyplanner",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    console.log(response.status);
    if (response.status === 200) {
      const result = await response.json();

      return result.data;
    }else {
      return null;
    }
  } catch {
    return null; // network error
  }
};
export default getDepartureData;
