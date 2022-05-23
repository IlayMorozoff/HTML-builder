const fs = require('fs');
const path = require('path');

async function mergeStyles() {
  try {
    const pathname = path.join(__dirname, 'project-dist');

    const filesIntoFolder = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });

    await fs.promises.writeFile(path.join(pathname, 'bundle.css'), '');
  
    for (let item of filesIntoFolder) {
      if (path.parse(item.name).ext === '.css') {
        const rf = await fs.promises.readFile(path.join(__dirname, 'styles', item.name), {encoding: 'utf8'});
        await fs.promises.appendFile(path.join(pathname, 'bundle.css'), rf);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

mergeStyles();