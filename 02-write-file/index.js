const fs = require('fs');
const path = require('path');
const readline = require('readline');


fs.writeFile(path.join(__dirname, 'output.txt'), '', (err) => {
  if (err) {
    throw new Error('something went wrong');
  }
  console.log('Введите какой-нибудь текст');
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

  fs.appendFile(path.join(__dirname, 'output.txt'), `${line}\n` , (err) => {
    if (err) {
      throw new Error('something went wrong');
    }
  });

}).on('close', () => {
  console.log('Спасибо, что были с нами');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Спасибо, что были с нами');
  process.exit(0);
});