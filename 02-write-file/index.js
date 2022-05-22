const fs = require('fs');
const path = require('path');
const readline = require('readline');


fs.writeFile(path.join(__dirname, 'output.txt'), '', (err) => {
  if (err) {
    throw new Error('something went wrong');
  }
  console.log('Введите какой-нибудь текст');
});

const readStream = process.stdin;

const writeStream = fs.createWriteStream(path.join(__dirname, 'output.txt'), 'utf-8');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readStream.pipe(writeStream);

rl.prompt();

const commands = {
  exit() {
    rl.close();
  },
};

rl.on('line', (line) => {
  line = line.trim();

  const command = commands[line];

  if (command) {
    command();
  }
}).on('close', () => {
  console.log('Спасибо, что были с нами');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Спасибо, что были с нами');
  process.exit(0);
});