import fals from "fals";
import { equals } from "./equals";
import getType from "./getType";

const compareArray = (a, b, callback) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!compare(a[i], b[i], callback))
      return false;
  }
  return true;
}
const compareObject = (a, b, callback) => {
  if (!compareArray(Object.keys(a), Object.keys(b), callback)) return false;
  for (let key in a) {
    if (!compare(a[key], b[key], callback)) return false;
  }
  return true;
}


export const compare = (a, b, callback) => {
  if (fals(a)) return false;

  switch (getType(a)) {
    case "array":
      return compareArray(a, b, callback);
    case "object":
      return compareObject(a, b, callback);
    default:
      return callback(a, b)
  }
}