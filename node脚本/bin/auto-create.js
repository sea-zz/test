const path = require('path');

const { dashNameParse, createFile, modifyRouter } = require('./util');
const { pageTemplate, componentsTemplate } = require('./template');

// 获取命令行参数
const type = process.argv[2];
const name = process.argv[3];

// 处理名字 TestPage => test-page
const lowerDashName = dashNameParse(name).toLocaleLowerCase();
// 目录
const rootPath = path.resolve('./');
const pagePath = rootPath + '/src/pages';
const componentPath = rootPath + '/src/components';

switch (type) {
  case 'page':
    const path = `${pagePath}/${lowerDashName}/index.vue`; // 路径
    const pageContent = pageTemplate(name); // 内容
    // 创建文件
    createFile(path, pageContent);
    // 修改路由
    modifyRouter(`pages/${lowerDashName}/index`);
    break;
  case 'component':
    const pathCom = `${componentPath}/${lowerDashName}/${lowerDashName}.vue`; // 路径
    const componentContent = componentsTemplate(name); // 内容
    // 创建文件
    createFile(pathCom, componentContent);
    break;
 }

console.log(`创建${type}：${name}成功`);
process.exit(0);