const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function copyDir() {
  try {
    const pathname = path.join(__dirname, 'files-copy');
    fsPromises.mkdir(pathname, {recursive: true});
  
    const filesIntoFolder = await fsPromises.readdir(path.join(__dirname, 'files'), { withFileTypes: true });
  
    for (let item of filesIntoFolder) {
      const rs = fs.createReadStream(path.join(__dirname, 'files', item.name));
      const ws = fs.createWriteStream(path.join(pathname, item.name));
      rs.pipe(ws);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

copyDir();
