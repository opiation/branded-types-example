//
// An array example of how a branded type does not integrate fully
// with TypeScript's existing type system.
//

interface Empty {
  readonly Empty: unique symbol;
}

function isEmptyArray<T>(arr: Array<T>): arr is Array<T> & Empty {
  return arr.length === 0;
}

const collection: Array<any> = [];
if (isEmptyArray(collection)) {
  let args: [] = collection;
}

//
// A string example of how a branded type does not integrate fully
// with TypeScript's
interface NonEmpty {
  readonly NonEmpty: unique symbol;
}

function isNonEmpty(str: string): str is string & NonEmpty {
  return str.length > 0;
}

const aNonEmptyExample: string & NonEmpty = "This is clearly not empty";
