export default function objValuesToStrings(obj) {
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      result[key] = value !== null ? String(value) : "";
    }
  }
  return result;
}