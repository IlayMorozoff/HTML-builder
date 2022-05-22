const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function readDir() {
  try {
    let items = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    return items.filter((item) => item.isFile());
  } catch (error) {
    throw new Error(error.message);
  }
}

readDir().then((data) => {
  data.forEach((item) => {
    fs.stat(path.join(__dirname, 'secret-folder', item.name), (err, stats) => {

      if (err) {
        throw new Error(err.message);
      }
      console.log(`${path.parse(item.name).name} - ${path.extname(item.name).replace('.', '')} - ${(stats.size / 1024).toFixed(3)}kB`);
    });
  });
});

