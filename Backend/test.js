const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      try {
        require(fullPath);
        console.log(`✅ Loaded ${fullPath}`);
      } catch (e) {
        console.error(`❌ Failed to load ${fullPath}:`, e.message);
      }
    }
  }
}

checkDir(path.join(__dirname, 'src'));
