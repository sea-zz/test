const {Controller} = require('egg')
const iconv = require('iconv-lite');//设置编码格式
const Cheerio = require('cheerio');
const { returnD } = require('../../tools/res')


class ZhiyaoController extends Controller {
    async index() {
        const {ctx} = this
        let page = ctx.query.page;
        const res = await ctx.curl(`https://www.czhiyao.com/page/${page}`, {contentType: 'text/html; charset=UTF-8', timeout: 90000})
        const bufs = iconv.decode(res.data, 'utf-8');
        const html = bufs.toString('utf-8');//转成utf-8
        const $ = Cheerio.load(html);//成功后用cheerio加载

        let data = []
        $('.content > div > article').each((idx, item) => {
            let url = $(item).find('.post-title > a').attr('href')
            let ret = {
                date: `${$(item).find('.post-date-year').text()}-${$(item).find('.post-date-month').text()}-${$(item).find('.post-date-day').text().trim()}`,
                title: $(item).find('.post-title > a').text(),
                img: $(item).find('.post-title > a > img').attr('src'),
                detailid: url ? url.split('/').pop().split('.')[0] : '',
                detailUrl: url ? url : ''
            }
            data.push(ret)
        })

        // 请求详情
        const allRes = await Promise.all(data.map(item => ctx.curl(item.detailUrl, {contentType: 'text/html; charset=UTF-8', timeout: 500000})))
        allRes.forEach((one, dx) => {
            const itembufs = iconv.decode(one.data, 'utf-8');
            const itemhtml = itembufs.toString('utf-8');//转成utf-8
            const $item = Cheerio.load(itemhtml);//成功后用cheerio加载
            
            let tmp = []
            $item('.entry > p').each((dx, one) => {
                tmp.push($(one).text())
            })
            data[dx].data = tmp
            delete data[dx].detailUrl;
        })

        ctx.body = returnD(data)
    }
    
    async add() {
        const data = this.ctx.request.body
        const res = await this.ctx.service.zhiyao.add(data)

        console.log(1111, res)

        this.ctx.body = returnD(res)
    }
}

module.exports = ZhiyaoController 
