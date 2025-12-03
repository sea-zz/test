#!/usr/bin/env node

/**
 * crontab -l 查看全部定时任务
 * crontab -e 写入/修改 定时任务
 * 本任务的命令：每天下午6点执行 （/usr/local/bin/node 本地的node位置）
 * 0 18 * * * /usr/local/bin/node /Users/haiyang.zhao/test/html/haiyan/iptv/script/cron_update_every_day.js
 * 这五个星号分别表示：
分钟（0-59）
小时（0-23）
日期（1-31）
月份（1-12）
星期（0-6，星期天为0）

eg
每小时的第15分钟执行:15 * * * * /path/to/script.sh
每天凌晨1点执行：0 1 * * * /path/to/script.sh
每周一中午12点执行：0 12 * * 1 /path/to/script.sh
每月1号执行：0 0 1 * * /path/to/script.sh
 */
// 每2分钟执行一次: */2 * * * * /path/to/script.sh

const fs = require('fs-extra'); // 使用 fs-extra 库来处理文件和文件夹
const path = require('path');
const { exec } = require('child_process'); // 用于执行 Git 命令

process.chdir(__dirname);

// 定义源和目标文件夹路径
const sourceDir = path.join(__dirname, 'assets'); // 本地的 a 文件夹
const targetDir = path.join(__dirname, '../../../../site-tools/public', 'assets'); // B 项目的 a 文件夹
const logFilePath = path.join(__dirname, '../log/js.txt'); // 日志文件路径

// 安装 fs-extra
// function installFsExtra() {
//     return new Promise((resolve, reject) => {
//         exec('pnpm add fs-extra', (error, stdout, stderr) => {
//             if (error) {
//                 reject(`安装 fs-extra 时发生错误: ${stderr}`);
//             } else {
//                 resolve(stdout);
//             }
//         });
//     });
// }

(async () => {
  try {
    // 检查 fs-extra 是否已安装
    // try {
    //     require('fs-extra');
    // } catch (error) {
    //     console.log('fs-extra 未安装，正在安装...');
    //     await installFsExtra();
    //     console.log('fs-extra 安装成功！');
    // }

    // const fs = require('fs-extra');

    // 执行本地 JavaScript 脚本
    require(path.join(__dirname, '../src/index.js')); // 替换为你的实际脚本路径

    // 等待一段时间确保 assets 文件夹生成
    await new Promise(resolve => setTimeout(resolve, 20000)); // 等待20秒（根据需要调整）

    // 检查 assets 文件夹是否存在
    if (await fs.pathExists(sourceDir)) {
      // 删除 B 项目的 a 文件夹（如果存在）
      await fs.remove(targetDir);
      fs.appendFile(logFilePath, '48:已删除 site-tools 项目的 assets 文件夹\n');

      // 复制本地的 assets 文件夹到 site-tools 项目
      await fs.copy(sourceDir, targetDir);
      // 测试
      await fs.copy(path.join(__dirname, '../log/log.txt'), path.join(__dirname, '../../../../site-tools/public', '', 'log.txt'));
      fs.appendFile(logFilePath, '54:已将 assets 文件夹复制到 site-tools 项目\n');

      // 进入 site-tools 项目的目录并执行 Git 命令
      process.chdir(path.join(__dirname, '../../../../site-tools')); // 进入 site-tools 项目目录

      // 检查git文件更新
      exec('git status --porcelain', (error, stdout, stderr) => {
        if (error) {
          fs.appendFile(logFilePath, `62:Error executing git status: ${error.message}\n`);
          return;
        }
        if (stderr) {
          fs.appendFile(logFilePath, `66:Error: ${stderr}\n`);
          return;
        }
        // 检查输出
        if (stdout) {
          fs.appendFile(logFilePath, '71:There are changes in the repository:\n');

          // 执行 Git 提交
          // `git add . && git commit -m "update:iptv source ${new Date().toLocaleString()}" && git push origin master`

          /**
           * 多人协作可以使用环境变量
           * bash：source ~/.bash_profile
           * zsh：source ~/.zshrc
           * 添加以下：
           * export GITHUB_USERNAME="your_username"
              export GITHUB_TOKEN="your_token"
              
              commit修改为：git push https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/haiyangzhaoo/site-tools.git master
              即可实现协作提交
           */
          exec(`git add . && git commit -m "update:iptv source ${new Date().toLocaleString()}" && git push https://haiyangzhaoo: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@github.com/haiyangzhaoo/site-tools.git master`, (error, stdout, stderr) => {
            if (error) {
              fs.appendFile(logFilePath, `78:执行错误: ${error}\n`);
              return;
            }
            fs.appendFile(logFilePath, `81:标准输出: ${stdout}\n`);
            fs.appendFile(logFilePath, `82:标准错误: ${stderr}\n`);
          });
        } else {
          fs.appendFile(logFilePath, `85:No changes in the repository.\n`);
        }

        // 记录更新时间到日志文件
        const logMessage = `89:更新时间: ${new Date().toLocaleString()}\n`;
        fs.appendFile(logFilePath, logMessage, err => {
          if (err) {
            fs.appendFile(logFilePath, `92:写入日志文件时发生错误:${err}\n`);
          } else {
            fs.appendFile(logFilePath, `94:更新时间已记录到日志文件\n`);
          }
        });
      });
    } else {
      fs.appendFile(logFilePath, `99:源文件夹 assets 不存在，无法复制。\n`);
    }

  } catch (error) {
    fs.appendFile(logFilePath, `103:发生错误: ${error}\n`);
  }
})();
