import { auth } from './auth_environment';

const { getSidFromMessage } = auth;

describe('getSidFromMessage', () => {
  test('accepts a raw string sid', () => {
    expect(getSidFromMessage('the-sid')).toBe('the-sid');
  });

  test('accepts a { sid } object', () => {
    expect(getSidFromMessage({ sid: 'the-sid' })).toBe('the-sid');
  });

  test('accepts a { type, sid } object', () => {
    expect(getSidFromMessage({ type: 'login', sid: 'the-sid' })).toBe(
      'the-sid'
    );
  });

  test('returns undefined for an empty string', () => {
    expect(getSidFromMessage('')).toBeUndefined();
  });

  test('returns undefined for undefined', () => {
    expect(getSidFromMessage(undefined)).toBeUndefined();
  });

  test('returns undefined for a non-sid object', () => {
    expect(getSidFromMessage({ type: 'login' })).toBeUndefined();
    expect(getSidFromMessage({ foo: 'bar' })).toBeUndefined();
  });

  test('returns undefined when sid is not a string', () => {
    expect(getSidFromMessage({ sid: 123 })).toBeUndefined();
  });
});

