const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

const replacements = [
  { from: /38, 38, 38/g, to: '255, 255, 255' }, // Dark Glass -> White Glass
  { from: /255, 127, 17/g, to: '37, 99, 235' }, // Orange -> Blue
  { from: /172, 191, 164/g, to: '226, 232, 240' }, // Sage -> Slate Border
];

function replaceInFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    let result = data;
    let changed = false;

    replacements.forEach(({ from, to }) => {
      if (from.test(result)) {
        result = result.replace(from, to);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) console.error(`Error writing file ${filePath}:`, err);
        else console.log(`Updated ${filePath}`);
      });
    }
  });
}

function traverseDirectory(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          traverseDirectory(filePath);
        } else if (stats.isFile() && /\.(jsx?|css)$/.test(file)) {
          replaceInFile(filePath);
        }
      });
    });
  });
}

traverseDirectory(directoryPath);
