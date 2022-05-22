const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

const writeStream = process.stdout;

readStream.pipe(writeStream);