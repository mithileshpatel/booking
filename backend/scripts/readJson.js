const fs = require('fs');
const path = require('path');

// Adjust the path according to your project structure
const jsonFilePath = path.join(__dirname, '../data/testuser.json');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

console.log(jsonData);
