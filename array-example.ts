interface NonEmptyArray {
  readonly NonEmptyArray: unique symbol;
}

function isNonEmptyArray<T>(arr: Array<T>): arr is Array<T> & NonEmptyArray {
  return arr.length > 0;
}

//
// Somewhere in a project...
//

interface Option {
  id: string;
  name: string;
}

// A convenience to present the user with a bunch of options
function showSomeOptions(options: Array<Option> & NonEmptyArray): string {
  return (
    "Here are your options:\n" +
    options
      .map((option, index) => `${index + 1}. ${option.name} (${option.id})`)
      .join("\n")
  );
}

// What to use when the user has no options
function showNoOptions(): string {
  return "We're sorry. There are no options available to you at this time.";
}

// Let's accept whatever options we have and present the user with appropraite
// information about those options.
function handleOptions(options?: Array<Option>): string {
  if (options) {
    return showSomeOptions(options);
  } else {
    return showNoOptions();
  }
}
