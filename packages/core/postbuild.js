import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Add "use client" directive to client files
const clientFiles = ['dist/client.js', 'dist/client.cjs'];

clientFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith('"use client"')) {
      const newContent = '"use client";\n' + content;
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Added "use client" to ${file}`);
    }
  }
});
