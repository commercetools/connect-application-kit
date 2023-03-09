export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

export function assertError(
  value: unknown,
  message?: string
): asserts value is Error {
  assert(value instanceof Error, message ?? 'Invalid error value');
}

export function assertString(
  value: unknown,
  message?: string
): asserts value is string {
  assert(typeof value === 'string', message ?? 'Invalid string value');
}
