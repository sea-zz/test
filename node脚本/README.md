# node 开发脚本执行命令执行生成 pages 文件和 components 文件

- 环境 uni-app
- 资料来源 uni-app 开发小程序，所以模拟执行后的结果针对 uni-app。不过修改目录和模板即可针对所有脚本环境。
- 目录只保留必要部分

## 自定义命令

项目根目录执行

```javascript
  ...
   "scripts": {
    "dev": "umi dev",
    "build": "umi build",
    "create:page": "./bin/auto-create.js page",
    "create:components": "./bin/auto-create.js components"
  },
  ...
```
