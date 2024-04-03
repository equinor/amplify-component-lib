// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconData } from '@equinor/eds-icons';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
  toContainEDSIcon(expected: IconData): R;
}

interface MatcherResult {
  pass: boolean;
  message: () => string;
  // If you pass these, they will automatically appear inside a diff when
  // the matcher does not pass, so you don't need to print the diff yourself
  actual?: unknown;
  expected?: unknown;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
