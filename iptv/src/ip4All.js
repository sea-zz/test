const { createFile, fetchPage, createJsFile } = require('./utils');
const path = require('path');
const rootPath = path.resolve('./');

const BLACK_CHANNEL = ['支持作者'];

// getAllIp4
const getAllIp4 = async () => {
  const ret = await fetchPage('https://live.hacks.tools/tv/iptv4.txt');
  const data = ret.split("\r\n\r\n\r\n").map(item => {
    const items = item.split("\r\n");
    const title = items.shift();
    const urls = {};
    items.forEach(item => {
      const [key, value] = item.split(",");

      if (key && value && !BLACK_CHANNEL.includes(key)) {
        if (urls?.[key]) {
          urls[key].push(value);
        } else {
          urls[key] = [value];
        }
      }
    });

    return { title: title.split(',')[0], data: Object.entries(urls).map(([key, value]) => ({ title: key, value })) };
  })
  createFile(`${rootPath}/assets/all.json`, data);
}

getAllIp4();
