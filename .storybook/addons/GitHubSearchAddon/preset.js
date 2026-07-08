import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const managerEntries = (entry = []) => [
  ...entry,
  join(__dirname, 'manager.js'),
];
