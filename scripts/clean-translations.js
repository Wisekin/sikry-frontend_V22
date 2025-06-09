const fs = require('fs');
const path = require('path');

// Read the original file
const filePath = path.join(__dirname, '../lib/i18n/translations.ts');
const backupPath = path.join(__dirname, '../lib/i18n/translations.backup.ts');
const outputPath = path.join(__dirname, '../lib/i18n/translations.clean.ts');

// Create a backup
fs.copyFileSync(filePath, backupPath);
console.log(`Created backup at: ${backupPath}`);

// Read the file content
let content = fs.readFileSync(filePath, 'utf8');

// Remove the first occurrence of the duplicate marketIntel section
const firstMarketIntelIndex = content.indexOf('    marketIntel: {');
const secondMarketIntelIndex = content.indexOf('    marketIntel: {', firstMarketIntelIndex + 1);

if (firstMarketIntelIndex !== -1 && secondMarketIntelIndex !== -1) {
  // Find the end of the first marketIntel section
  let endBraceIndex = content.indexOf('    },', firstMarketIntelIndex) + 5;
  while (content[endBraceIndex] !== '}') {
    endBraceIndex = content.indexOf('    },', endBraceIndex) + 5;
  }
  
  // Remove the first marketIntel section
  content = content.substring(0, firstMarketIntelIndex) + 
             content.substring(endBraceIndex + 1);
  
  // Write the cleaned content to a new file
  fs.writeFileSync(outputPath, content);
  console.log(`Cleaned file written to: ${outputPath}`);
  
  // Optional: Replace the original file
  fs.renameSync(outputPath, filePath);
  console.log(`Original file replaced with cleaned version.`);
} else {
  console.log('No duplicate marketIntel sections found or error in parsing.');
}
