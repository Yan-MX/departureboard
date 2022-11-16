
 export const delay = ms => new Promise(res => setTimeout(res, ms));
 export function getDelayedMins(time1, time2) {
    return Math.round(
      (((Date.parse(time1) - Date.parse(time2)) % 86400000) % 3600000) / 60000
    );
  }
  export const getArrivalTime=(time1,time2)=>{
    let time= getDelayedMins(time1, time2);
    return time<1?  "Now":  `In ${time} min`;
  }



 
 