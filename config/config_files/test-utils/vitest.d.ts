import { IconData } from '@equinor/eds-icons';

import type {
  Assertion as VitestAssertion,
  AsymmetricMatchersContaining as VitestAsymmetricMatchersContaining,
} from 'vitest';

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
  // vitest uses 'any' intentionally and suggests to ignore eslint rule here (https://github.com/vitest-dev/vitest/issues/4543)
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any
  type Assertion<T = any> = CustomMatchers<T> & VitestAssertion<T>;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  type AsymmetricMatchersContaining = CustomMatchers &
    VitestAsymmetricMatchersContaining<T>;
}
