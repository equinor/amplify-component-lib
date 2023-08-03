/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
  }
}
