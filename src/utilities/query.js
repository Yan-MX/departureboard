export const query = `{
    stopPlace(id: "NSR:StopPlace:4000") {
      id
      name
      estimatedCalls(timeRange: 1800, numberOfDepartures: 8, whiteListedModes: [bus]) {     
        aimedArrivalTime
        expectedArrivalTime
        destinationDisplay {
          frontText
        }
        serviceJourney {
          journeyPattern {
            line {
              name
              publicCode
            }
          }
        }
      }
    }
  }
  `;