const path = require('path');
const fs = require('fs').promises;

const targetDir = path.resolve(__dirname + '/..');

fs.cp(__dirname, targetDir, { recursive: true }).then(() => {
  fs.rmdir(__dirname, { recursive: true });
});
