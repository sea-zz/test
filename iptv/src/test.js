
const cheerio = require('cheerio');
const path = require('path');
const { createFile, fetchPage } = require('./utils');

const rootPath = path.resolve('./');


/**
 * 
 * TODO: 数字频道解析script存在问题，script分成2块了
 */
const parseCateHtml = async (fileName) => { 
const html = await fetchPage('https://iptv.hacks.tools/domestic/IPv4 直播源/category/戏曲频道/m3u');

  const $ = cheerio.load(html);
  const data = $('script');
  const res = [];
  // 找到#EXTM3U 开始及之后的script(含有group-title)
  const sourceData = data.filter((idx, item) => $(item).text().includes('group-title'));
  const getSourceStr = () => { 
    if (!sourceData?.length) { 
      return '';
    }

    if (sourceData?.length === 1) { 
      return $(sourceData[0]).text();
    }

    let str = '';
    sourceData.map((idx, item) => {
      let tmp = '';
      if (idx === 0) {
        tmp = $(item).text().slice(0, -3);
      } else if (idx === sourceData?.length - 1) {
        tmp = $(item).text().slice(23);
      } else {
        tmp = $(item).text().slice(23, -3);
      }

      str += tmp;
    });
    
    return str;
  }

  data.map((idx, item) => {
    if ($(item).text().includes('#EXTM3U')) {
      // 页面数据不全，从script获取
      const str = $(item).text().slice(22, -2);

      const arr = str.split('#EXTINF:-1'); // 每条数据最后一条就是链接
      arr.shift();
      let tmp = {};
      // 数据变动会出错
      const rVal = data => data
        .replace(/\\\"/g, '"') // 去除斜线转义
        .replace(/\\r\\n/g, '') // 去除换行符
        .replace(/\\n/g, '')
        .replace(/\\"/g, '')
        .replace(/\"/g, '').replace(/\\/g, '');
      arr.forEach(item => {
        // TODO: url存在& 解析问题 ？、戏曲频道、
        let lastHttp = item.lastIndexOf('http://');
        let lastHttps = item.lastIndexOf('https://');
        if (lastHttp > -1 || lastHttps > -1) { 
          if (lastHttp !== -1) { 
            tmp.url = rVal(item.substring(lastHttp))
          } else if (lastHttps !== -1) {
            tmp.url = rVal(item.substring(lastHttps))
          }

          const items = item.split(' ');
          items.forEach(ite => { 
            const [key, value] = ite.split('=');
            key && (tmp[key] = value ? rVal(value) : '');
          });
        }

        if (tmp?.url) {
          res.push(tmp);
          tmp = {};
        }
      });
    }
  });

  // 最后一条数据url格式处理，默认倒数第二条和最后一条格式一样
  let lastUrl = res[res.length - 1].url;
  let lastExt = res[res.length - 2].url.slice(res[res.length - 2].url.lastIndexOf('.'));
  res[res.length - 1].url = lastUrl.slice(0, lastUrl.lastIndexOf(lastExt) + lastExt.length);

  createFile(`${rootPath}/test/${fileName}.json`, {count: res.length, list: res});
}

parseCateHtml('test');
