const cheerio = require('cheerio');
const path = require('path');
const { createFile, fetchPage, createJsFile } = require('./utils');

const rootUrl = 'https://iptv.hacks.tools';
const rootPath = path.resolve('./');

// 解析menu页面的分类资源标题和链接
const parseMenuHtml = (html) => {
  const $ = cheerio.load(html);
  const ip4Data = $('#ipv4-section .w-full .ring-offset-background .rounded-lg');
  const internationalData = $('#international .rounded-lg');
  const res = [];
  ip4Data.map((idx, item) => {
    const title = $(item).find('h3').text();
    res.push({
      title: title.replace(/[a-zA-Z]/g, ''),
      url: rootUrl + $(item).find('> div a').attr('href')
    });
  });
  internationalData.map((idx, item) => {
    const title = $(item).find('h3').text();
    const href = $(item).find('> div a').attr('href');

    if (!href.includes('https://')) {
      res.push({
        title: title.slice(0, title.indexOf('(')),
        url: rootUrl + href,
      });
    }
  });

  // 写入menu内容
  createFile(`${rootPath}/assets/menu.json`, res);
  // 微信小程序使用
  createJsFile(`${rootPath}/json/menu.js`, res);
  return res;
}
// 获取script源数据
const getSourceStr = ($, sourceData) => {
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

// 获取只包含播放资源的源数据
const getDataSourceStr = (str, fileName) => {
  const startIndex = str.indexOf('#EXTM3U');
  const lastIndex = (() => {
    if (str.includes('\\nupdateTime')) {
      return str.indexOf('\\nupdateTime');
    }
    return str.lastIndexOf('\\r\\n');
  })();

  return str.length ? str.substring(startIndex, lastIndex) : '';
}

const parseCateHtmlV2 = (html, fileName) => {
  const $ = cheerio.load(html);
  const data = $('script');
  const res = [];
  // 找到#EXTM3U 开始及之后的script(含有group-title)
  const sourceData = data.filter((idx, item) => $(item).text().includes('group-title'));

  const str = getSourceStr($, sourceData);
  const dataStr = getDataSourceStr(str, fileName);
  if (dataStr) {
    const arr = dataStr.split('\\n#EXTINF:-1'); // 每条数据最后一条就是链接，\\n这里是为了和数据末尾url保持一致
    arr.shift(); // #EXTM3U 开头无用数据
    let tmp = {};
    // 数据变动会出错
    const rVal = data => data
      .replace(/\\\"/g, '"') // 去除斜线转义
      .replace(/\\r\\n/g, '') // 去除换行符
      .replace(/\\n/g, '')
      .replace(/\\r/g, '')
      .replace(/\\"/g, '')
      .replace(/\"/g, '').replace(/\\/g, '');
    arr.forEach(item => {
      let urlIdx = item.lastIndexOf('\\n');
      if (urlIdx > -1) {
        tmp.url = rVal(item.substring(urlIdx).replace(/\\u0026/g, '&'));
        item = item.substring(0, urlIdx);

        const items = item.split(' ');
        items.forEach(ite => {
          let [key, value] = ite.split('=');
          key = key?.replace('-', '_');
          key && value && (tmp[key] = value ? rVal(value) : '');
        });
      }

      if (tmp?.url) {
        res.push(tmp);
        tmp = {};
      }
    });

    arr.length !== res.length && console.log(`${fileName} 缺失数据`);
  }

  createFile(`${rootPath}/assets/${fileName}.json`, { count: res.length, list: res });
  // 微信小程序使用
  createJsFile(`${rootPath}/json/${fileName}.js`, { count: res.length, list: res });
}

const cateFetchPage = async (data) => {
  const ret = await Promise.all(data.map(item => fetchPage(item.url)));
  ret.forEach((html, idx) => {
    parseCateHtmlV2(html, data[idx].title);
  });
}

const main = async () => {
  const html = await fetchPage(rootUrl);
  const menuResult = parseMenuHtml(html);
  const cateHtml = await cateFetchPage(menuResult);
};

main();
