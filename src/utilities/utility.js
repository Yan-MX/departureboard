export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
 const delay = ms => new Promise(res => setTimeout(res, ms));

 export default delay