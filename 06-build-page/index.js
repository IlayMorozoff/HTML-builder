const fs = require('fs');
const path = require('path');

async function copyDir(from, to) {
  try {
    const filesAndFolder = await fs.promises.readdir(from, { withFileTypes: true });
    await fs.promises.mkdir(to, { recursive: true });
    for (let item of filesAndFolder) {
      const fromPath = path.join(from, item.name);
      const toPath = path.join(to, item.name);
      if (item.isDirectory()) {
        await copyDir(fromPath, toPath);
      } else {
        await fs.promises.copyFile(fromPath, toPath);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function mergeStyles() {
  try {

    const pathname = path.join(__dirname, 'project-dist');

    const filesIntoFolder = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });

    await fs.promises.writeFile(path.join(pathname, 'style.css'), '');

    for (let item of filesIntoFolder) {
      if (path.parse(item.name).ext === '.css') {
        const rf = await fs.promises.readFile(path.join(__dirname, 'styles', item.name), { encoding: 'utf8' });
        await fs.promises.appendFile(path.join(pathname, 'style.css'), rf);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function mergeTemplate() {

  try {
    const folderAndFiles = await fs.promises.readdir(path.join(__dirname), { withFileTypes: true });

    if (folderAndFiles.some((item) => item.name === 'project-dist')) {
      await fs.promises.rm(path.join(__dirname, 'project-dist'), { recursive: true });
    }
    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });

    const files = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });

    for (let file of files) {

      if (path.parse(file.name).ext === '.html') {
        const content = await fs.promises.readFile(path.join(__dirname, 'components', file.name), { encoding: 'utf8' });
        template = template.replace(`{{${path.parse(file.name).name}}}`, content);
      }
    }

    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, { encoding: 'utf8' });

  } catch (error) {
    throw new Error(error.message);
  }

}

async function buildApp() {
  try {
    await mergeTemplate();
    await mergeStyles();
    await copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  } catch (error) {
    throw new Error(error.message);
  }
}

buildApp();

