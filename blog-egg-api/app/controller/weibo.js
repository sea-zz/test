const { Controller } = require('egg')
const { returnD } = require('../../tools/res')
const iconv = require('iconv-lite');//设置编码格式
const Cheerio = require('cheerio');
const xlsx = require('node-xlsx');
const fs = require('fs');
// const AMapLoader = require('@amap/amap-jsapi-loader')

class WeiboController extends Controller {
    async search() {
        const res = await this.ctx.curl('https://weibo.com/ajax/statuses/hot_band', {
            contentType: 'json'
        })

        this.ctx.status = res.status;
        this.ctx.set(res.headers);
        this.ctx.body = res.data;
    }

    async topic() {
        const { ctx} = this
        const {page = 1, size = 10} = ctx.query
        const res = await ctx.curl('https://weibo.com/ajax/statuses/topic_band', {
            data: {
                sid: 'v_weibopro',
                category: 'all',
                page,
                size
            }
        })

        ctx.set(res.headers)
        ctx.status = res.status
        ctx.body = res.data
    }

    // 百度热搜
    async baidu() {
        const { ctx } = this
        let type = ctx.query.type

        const ret = await ctx.curl(`https://top.baidu.com/api/board?tab=${type}`)
        ctx.set(ret.headers)
        ctx.status = ret.status
        ctx.body = ret.data
    }
    
    // 微博要闻榜单
    async socialevent() {
        const { ctx } = this

        const ret = await ctx.curl(`https://s.weibo.com/top/summary?cate=socialevent`, {
            contentType: 'text/html; charset=UTF-8',
            method: 'get',
            // timeout: 5000,
            headers: {
                cookie: '_s_tentry=weibo.com; Apache=6498847794942.844.1669167747821; SINAGLOBAL=6498847794942.844.1669167747821; ULV=1669167747826:1:1:1:6498847794942.844.1669167747821:; WBtopGlobal_register_version=2022112309; UOR=,,localhost:8002; SCF=AoNukvtRRu6zEKnbtsjs0Zmg5DoDjfodO1YE_YlWlTKjLLbJUXBf9OHGlopZJeGr_kngnuhBoa1QlGhcIxhhFro.; SUBP=0033WrSXqPxfM72wWs9jqgMF55529P9D9WFj2Zp2Ni8km8_L8I25Izcu5JpVF02Re0qfeoqXeo50; SUB=_2AkMUzhFcdcPxrABQnv8XzG_maIlH-jynG3iqAn7uJhMyAxh77g0rqSVutBF-XHUSu7N97kFvSfq3cAygo5z6UeDU'
            }
        })

        const bufs = iconv.decode(ret.data, 'utf-8');
        const html = bufs.toString('utf-8');//转成utf-8
        const $ = Cheerio.load(html);//成功后用cheerio加载
        const res = []
        $('#pl_top_realtimehot tbody > tr').each((i, item) => {
            res.push({
                text: $(item).find('.td-02 a').text(),
                url: 'https://s.weibo.com' + $(item).find('.td-02 a').attr('href')
            })
        });

        ctx.body = returnD(res)
    }

    // 微博文娱榜单
    async entrank() {
        const { ctx } = this

        const ret = await ctx.curl(`https://s.weibo.com/top/summary?cate=entrank`, {
            contentType: 'text/html; charset=UTF-8',
            method: 'get',
            // timeout: 5000,
            headers: {
                cookie: '_s_tentry=weibo.com; Apache=6498847794942.844.1669167747821; SINAGLOBAL=6498847794942.844.1669167747821; ULV=1669167747826:1:1:1:6498847794942.844.1669167747821:; WBtopGlobal_register_version=2022112309; UOR=,,localhost:8002; SCF=AoNukvtRRu6zEKnbtsjs0Zmg5DoDjfodO1YE_YlWlTKjLLbJUXBf9OHGlopZJeGr_kngnuhBoa1QlGhcIxhhFro.; SUBP=0033WrSXqPxfM72wWs9jqgMF55529P9D9WFj2Zp2Ni8km8_L8I25Izcu5JpVF02Re0qfeoqXeo50; SUB=_2AkMUzhFcdcPxrABQnv8XzG_maIlH-jynG3iqAn7uJhMyAxh77g0rqSVutBF-XHUSu7N97kFvSfq3cAygo5z6UeDU'
            }
        })

        const bufs = iconv.decode(ret.data, 'utf-8');
        const html = bufs.toString('utf-8');//转成utf-8
        const $ = Cheerio.load(html);//成功后用cheerio加载
        const res = []
        $('#pl_top_realtimehot tbody > tr').each((i, item) => {
            res.push({
                text: $(item).find('.td-02 a').text(),
                url: 'https://s.weibo.com' + $(item).find('.td-02 a').attr('href'),
                hot: $(item).find('.td-02 span').text(),
                tag: {
                    text: $(item).find('.td-03 i').text(),
                    color: $(item).find('.td-03 i').attr('style') && $(item).find('.td-03 i').attr('style').split(':')[1],
                }
            })
        });    

        const resing = []
        $('.data').eq(1).find('tbody > tr').each((i, item) => {
            resing.push({
                text: $(item).find('.td-02 a').text(),
                url: 'https://s.weibo.com' + $(item).find('.td-02 a').attr('href'),
                hot: $(item).find('.td-02 span').text(),
            })
        });

        ctx.body = returnD({
            now: res,
            nowing: resing
        })
    }

    // 知乎热搜
    async zhihu() {
        const { ctx } = this
        const ret = await ctx.curl('https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true')

        ctx.set(ret.headers)
        ctx.status = ret.status
        ctx.body = ret.data
    }

    // 测试请求外部接口
    async test() {
        // const data = await this.ctx.curl('https://sandbox.kefu.easemob.com/v2/tenants/28994/integration/tickets/multiple', {
        //     method: 'POST',
        //     contentType: 'json',
        //     data: {
        //         createdEnd: "2022-11-13 17:23:24",
        //         createdStart: "2022-11-11 17:23:21",
        //     },
        //     dataType: 'json',
        //     headers: {
        //         cookie: '74f5576d-a4b8-418e-bf9c-3d9f707b9a6b=webim-visitor-RV6BJW4YQF2FHG3T6F78; pass74f5576d-a4b8-418e-bf9c-3d9f707b9a6b=88388P36QT; i18next=zh-CN; Hm_lvt_3e5b3453fdcff1e4dec124ea22f1e189=1667188574,1667361263; root197e1420-9359-415f-b0fc-2731598afece=webim-visitor-7TKXGYXF4774W669KWC4; Hm_lpvt_3e5b3453fdcff1e4dec124ea22f1e189=1667813754; tenantid=28994; userid=e8a95024-bece-488b-b04a-4b12bacac410; SESSION=12cd1843-9b12-4ec9-bdaa-5c8655668b50; csrfToken=Q5Ji5oVFBTnirAxX7RStWB-7'
        //     }
            
        // })
        // this.ctx.body = data

        // get请求 下面3个设置是必须的
        const result = await this.ctx.curl('https://sandbox.kefu.easemob.com/management/configs')
        this.ctx.status = result.status;
        this.ctx.set(result.headers);
        this.ctx.body = result.data;
    }

    async weather() {
        // const AMap = await AMapLoader.load({
        //     "key": "a2310fcac1c5726f81ecffe64e273c22", // 申请好的Web端开发者Key，首次调用 load 时必填
        //     "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        //     "plugins": ['AMap.Geolocation'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        // })

        // AMap.plugin('AMap.Geolocation', function() {
        //     var geolocation = new AMap.Geolocation({
        //       // 是否使用高精度定位，默认：true
        //       enableHighAccuracy: true,
        //       // 设置定位超时时间，默认：无穷大
        //       timeout: 10000,
        //       // 定位按钮的停靠位置的偏移量
        //       offset: [10, 20],
        //       //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //       zoomToAccuracy: true,     
        //       //  定位按钮的排放位置,  RB表示右下
        //       position: 'RB'
        //     })
          
        //     geolocation.getCurrentPosition(function(status,result){
        //           if(status=='complete'){
        //               onComplete(result)
        //           }else{
        //               onError(result)
        //           }
        //     });
          
        //     function onComplete (data) {
        //         console.log(11111, data)
        //       // data是具体的定位信息
        //     }
          
        //     function onError (data) {
        //         console.log(2222222, data)
        //       // 定位出错
        //     }
        //   })

        // extensions: base:返回实况天气 all:返回预报天气 
        let key = '22c8b6da4cc03d8ef76cbc755c639c80'
        let city = this.ctx.query.city
        let url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${key}&extensions=base&output=JSON`
        const res = await this.ctx.curl(url)

        this.ctx.status = res.status
        this.ctx.set(res.headers)
        this.ctx.body = res.data
    }

    async citycode() {
        //读取文件内容
        var obj = xlsx.parse(__dirname+'/../../static/city.xlsx');
        var excelObj=obj[0].data;
        console.log(excelObj);
        var data = [];
        for(var i in excelObj){
            // var arr=[];
            
            // for(var j in value){
            //     arr.push(value[j]);
            // }
            if (i > 1) {
                var value=excelObj[i];
                const [name, adcode, citycode] = value
                data.push({name, adcode, citycode});
            }
        }

        this.ctx.body = returnD(data)

        // var buffer = xlsx.build([
        // {
        //     name:'sheet1',
        //     data:data
        // }
        // ]);
        // //将文件内容插入新的文件中
        // fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});

    }

    /**
     * price=-1,9
     * outter_detail_type=0,1,2,3,4,5 轿车 
     * 10,11,12,13,14：suv
     * 20,21,22,23：mpv
     * https://www.dongchedi.com/auto/series/${series_id}
     */
    async carrank() {
        const { ctx } = this
        const ret = await ctx.curl('https://www.dongchedi.com/motor/pc/car/rank_data?aid=1839&app_name=auto_web_pc&city_name=北京&count=200&offset=0&month=&new_energy_type=&rank_data_type=11&brand_id=&price=&manufacturer=&outter_detail_type=20,21,22,23&nation=0')
        ctx.set(ret.headers)
        ctx.status = ret.status
        const bufs = JSON.parse(iconv.decode(ret.data, 'utf-8'));
        const res = bufs.data.list
        res.map(item => {
            delete item['offline_car_ids']
            delete item['online_car_ids']
        })

        // 写入数据库
        const r = await ctx.service.dongchedi.add(res)

        ctx.body = returnD(r)
    }
}

module.exports = WeiboController

