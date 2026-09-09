# amplify-component-lib

React + TypeScript component library (`@equinor/amplify-component-lib`) for Equinor's Amplify team. Components, hooks, providers and utils used across Amplify apps.

## Setup and commands

Package manager is **bun**, not npm/yarn — always use `bun run <script>`.

- `bun install --frozen-lockfile` — install deps
- `bun run lint` — `tsc --noEmit` + eslint on `src` and `.storybook` (run after any change)
- `bun run pretty:fix` — format `config`, `src`, `.storybook`
- `bun run test:ci` — run the full vitest suite once (CI mode)
- `bun run test` — vitest watch mode, for local iteration
- `bun run build-components` — compile the library with tsdown

## Source layout

`src/` is organized by atomic-design tier: `atoms/` (types, enums, utils, hooks, icons, style — no components), `molecules/`, `organisms/`, `providers/` (context providers), `deprecated/` (kept for back-compat, do not extend). Each component gets its own folder named after it (PascalCase) containing `Component.tsx`, `Component.styles.ts` (styled-components), `Component.utils.ts(x)`, `types.ts`, `Component.stories.tsx`, and test file(s). Everything is re-exported through `src/index.ts` via each tier's barrel file — add new public exports there.

Import internal modules with the `src/...` absolute alias (configured in `tsconfig.json`), not deep relative paths (`../../../`).

## Testing: file name picks the runner

Vitest is split into three projects by **file name pattern** (see `vitest.config.ts`) — putting a test in the wrong pattern means it silently runs in the wrong environment or not at all:

- `*.utils.test.ts` — jsdom project, for pure logic/utils, no DOM rendering.
- `*.jsdom.test.tsx` — jsdom project, for component tests that don't need a real browser.
- plain `*.test.tsx` anywhere except `src/atoms` or `src/deprecated` — real-browser project (Playwright/Chromium).
- `*.stories.tsx` with a `play` function — exercised by the storybook test project.

Match existing sibling tests' naming when adding to a component that already has them. Use the `javascript-testing-patterns` skill for test-writing strategy, and the `storybook-*` skills when writing or editing stories.

## Conventions

- Styling via `styled-components`, tokens/variants centralized in each component's own `tokens/` folder or `.styles.ts` (see `Button` for the pattern of variant→token maps).
- Imports are auto-sorted by eslint (`simple-import-sort`): react → `@`-scoped → `src/...` and relative → plain packages → styles → side-effect imports. Run `bun run lint:fix` to fix ordering instead of hand-ordering.
- Prettier: single quotes, semicolons, trailing commas (es5), 2-space indent — already enforced by `pretty:fix`, don't hand-format against it.
- PR titles follow Conventional Commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `build`, `perf`, ...) — enforced by CI on the PR title itself.
