const fs = require('fs');
const path = require('path');

// 处理名字 TestPage => test-page
const dashNameParse = (name) => { 
  return name.replace(/([A-Z])/g, '-$&').replace(/^-/, '');
}

// 创建文件
const createFile = (filePath, content) => {
  const dir = filePath.split('/');
  let currentPath = '';
  for (var key of dir) {
    currentPath += `/${key}`;
    if (currentPath.indexOf('.vue') > -1) {
      if (fs.existsSync(currentPath)) {
        console.log(`文件已存在：${currentPath}`);
        process.exit(1);
      } else {
        fs.writeFileSync(currentPath, content, { encoding: 'utf-8' });
      }
    }

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  }
}

// 修改路由
const modifyRouter = (router) => { 
  // 路由地址
  const jsonPath = path.resolve('./') + '/app.json';
  // 读取文件并添加新路由
  const jsonContent = fs.readFileSync(jsonPath, { encoding: 'utf-8' });
  const jsonData = JSON.parse(jsonContent);
  const newRoute = { ...jsonData, pages: [...jsonData.pages, router] };
  // 写入文件
  fs.writeFileSync(jsonPath, JSON.stringify(newRoute, null, 2), { encoding: 'utf-8' });
  console.log(`路由已更新：${router}`); 
}

module.exports = {
  dashNameParse,
  createFile,
  modifyRouter
};
