/**
 * make unix timestamp to yyyy-mm-dd hh24:MM
 * @param {number} timestamp
 * @returns string
 */
const timestampToString = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export { timestampToString };
