// Converts all values of an object into strings
export default function objValuesToStrings(obj) {
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      // The value null, turn it into an empty string ""
      // Otherwise, convert it to its string representation
      result[key] = value !== null ? String(value) : "";
    }
  }
  return result;
}