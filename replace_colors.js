const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

const replacements = [
  { from: /#262626/g, to: '#F0F9FF' }, // Main BG -> Very Light Blue
  { from: /#333333/g, to: '#FFFFFF' }, // Card BG -> White
  { from: /#444444/g, to: '#E2E8F0' }, // Border -> Light Slate
  { from: /#E2E8CE/g, to: '#1E3A8A' }, // Text Main -> Dark Blue
  { from: /#ACBFA4/g, to: '#475569' }, // Text Secondary -> Slate 600
  { from: /#FF7F11/g, to: '#2563EB' }, // Accent -> Blue 600
  { from: /#e06c09/g, to: '#1D4ED8' }, // Accent Hover -> Blue 700
  { from: /#666666/g, to: '#64748B' }, // Muted Text -> Slate 500
  { from: /#111111/g, to: '#0F172A' }, // Black -> Slate 900
  
  // Tailwind class replacements
  { from: /orange-/g, to: 'blue-' },
  { from: /amber-/g, to: 'blue-' },
  { from: /yellow-/g, to: 'blue-' },
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
