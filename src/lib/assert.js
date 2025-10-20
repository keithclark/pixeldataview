/**
 * Helper for throwing an error
 * 
 * @param {Error} errorType the value to format
 * @param {string} message Description of the error
 * @param {string} [context] Optional context for the error
 */
const raiseError = (errorType, message, context) => {
  if (context) {
    message = context + '. ' + message;
  }
  throw new errorType(message);
};


/**
 * Helper for throwing an assertion error
 * 
 * @param {Error} errorType the value to format
 * @param {string} expectation Description of the expected outcome
 * @param {string} actual Description of the actual outcome
 * @param {string} [context] Optional context for the error
 */
const raiseUnexpectedError = (errorType, expectation, actual, context) => {
  if (Array.isArray(expectation)) {
    expectation = conjuction(expectation);
  }
  raiseError(
    errorType,
    `Expected ${expectation}, got ${actual}.`,
    context ? `Invalid ${context}` : context
  );
};


/**
 * Formats a value into a readable string representation.
 * 
 * @param {*} value the value to format
 * @returns {string} The formatted value
 */
const formatValue = (value) => {
  if (typeof value === 'string') {
    return `"${value}"`;
  } 
  return value;
};


/**
 * Combines an array of values into a sentence.
 * 
 * @param {string[]} values 
 * @returns {string}
 */
const conjuction = (values) => {
  if (values.length < 2) {
    return values[0];
  }
  return `${values.slice(0, -1).join(', ')} or ${values.at(-1)}`;
};


/**
 * Ensures a value is within a given range.
 * 
 * @param {number} value The value to check
 * @param {number} min The minimum allowed value 
 * @param {number} max The maximum allowed value 
 * @param {string} message Message to include in the assertion error
 * @throws {RangeError}
 */
export const assertBetween = (value, min, max, message = 'Invalid value') => {
  if (value < min || value > max) {
    raiseUnexpectedError(
      RangeError,
      `between ${min} and ${max}`,
      value,
      message
    );
  }
};


/**
 * Ensures a value is an instance of one or more objects.
 * 
 * @param {*} value The value to check 
 * @param {Object[]} types The object types to checkfor
 */
export const assertInstance = (value, types, message) => {
  if (!types.some((type) => value instanceof type)) {
    raiseUnexpectedError(
      TypeError,
      types.map(v => v.name),
      typeof value,
      message
    );
  }
};


/**
 * Ensures a value is of a given type.
 * 
 * @param {*} value The value to check 
 * @param {string[]} types The allowed type names (e.g `string` or `boolean`)
 */
export const assertType = (value, types, message) => {
  if (!types.includes(typeof value)) {
    raiseUnexpectedError(
      TypeError,
      types,
      typeof value,
      message
    );
  }
};


/**
 * Ensures a value matches one of a given list of values
 * 
 * @param {*} value The value to check 
 * @param {[]} values The allowed values
 */
export const assertOneOf = (value, values, message) => {
  if (!values.includes(value)) {
    raiseUnexpectedError(
      RangeError,
      values.map(formatValue),
      formatValue(value),
      message
    );
  }
};
