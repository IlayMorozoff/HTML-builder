const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function copyDir() {
  try {
    const pathname = path.join(__dirname, 'files-copy');

    const folderAndFiles = await fsPromises.readdir(path.join(__dirname), { withFileTypes: true });

    if (folderAndFiles.some((item) => !item.isFile() && item.name === 'files-copy')) {
      await fsPromises.rm(pathname, { recursive: true });
    }
    await fsPromises.mkdir(pathname);
  
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
