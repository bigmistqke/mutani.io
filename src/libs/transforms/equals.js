import fals from "fals";
import getType from "./getType";

const equalsArray = (a, b, log) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!equals(a[i], b[i], log))
      return false;
  }
  return true;
}
const equalsObject = (a, b, log) => {
  if (!equalsArray(Object.keys(a), Object.keys(b))) return false;
  for (let key in a) {
    if (!equals(a[key], b[key])) return false;
  }
  return true;
}


export const equals = (a, b, log = false) => {
  if (fals(a)) return false;

  switch (getType(a)) {
    case "array":
      return equalsArray(a, b, log);
    case "object":
      return equalsObject(a, b, log);
    default:
      return a === b
  }
}