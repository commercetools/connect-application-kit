export function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function assertError(value, message) {
  assert(value instanceof Error, message ?? 'Invalid error value');
}

export function assertString(value, message) {
  assert(typeof value === 'string', message ?? 'Invalid string value');
}
