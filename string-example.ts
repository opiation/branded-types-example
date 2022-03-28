/**
 * Here's the thing I want to be sure about when I use it. I want to know that
 * something is a well-formed email address as per the RFC (roughly).
 */
interface EmailAddress {
  readonly EmailAddress: unique symbol;
}

/**
 * Regular expression to validate email addresses
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
 */
const validityExpression =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/** Is the given `candidate` string a valid {@link EmailAddress}? */
function isEmailAddress(candidate: string): candidate is EmailAddress & string {
  return validityExpression.test(candidate);
}

//
// Somewhere in a project...
//

// A convenience for nicely displaying an email addres...
function showEmailAddress(addr: EmailAddress): string {
  return `This is an email address: ${addr}`;
}

// A convenience for nicely displaying a name...
function showName(name: string): string {
  return `This is a name or something: ${name}`;
}

// This gets string data that for unfortunately _unioned_ and chooses an
// appropriate utility for displaying the data.
function handleContact(info: string): string {
  if (isEmailAddress(info)) {
    return showEmailAddress(info);
  } else {
    return showName(info);
  }
}
