const axios = require('axios');
const fs = require('fs');

// 写入内容
const createFile = (filePath, content) => {
  const dir = filePath.split('/');
  let currentPath = '';

  for (let key of dir) {
    currentPath += `/${key}`;

    if (currentPath.includes('.json')) {
      fs.writeFileSync(currentPath, JSON.stringify(content, null, 2), { encoding: 'utf-8', });
      // if (fs.existsSync(currentPath)) { 
      //   console.error(`文件已存在：${filePath}`);
      //   // process.exit(1);
      // } else { 
      //   fs.writeFileSync(currentPath, JSON.stringify(content, null, 2), {encoding: 'utf-8', });
      // }
    }

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  }
}

const createJsFile = (filePath, content) => {
  const dir = filePath.split('/');
  let currentPath = '';

  for (let key of dir) {
    currentPath += `/${key}`;

    if (currentPath.includes('.js')) {
      fs.writeFileSync(currentPath, `module.exports = ${JSON.stringify(content, null, 2)}`, { encoding: 'utf-8', });
      // if (fs.existsSync(currentPath)) { 
      //   console.error(`文件已存在：${filePath}`);
      //   // process.exit(1);
      // } else { 
      //   fs.writeFileSync(currentPath, JSON.stringify(content, null, 2), {encoding: 'utf-8', });
      // }
    }

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  }
}

// 请求页面的分类资源
const fetchPage = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(`页面请求失败：${err}`);
    process.exit(0);
  }
}

module.exports = { createFile, fetchPage, createJsFile }
