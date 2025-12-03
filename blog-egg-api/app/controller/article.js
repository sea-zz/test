const { Controller } = require('egg')
const { returnD } = require('../../tools/res')

const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const fs = require('fs');
const await = require('await-stream-ready/lib/await');

class ArticleController extends Controller {
    async add() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.title || !param.content) {
            ctx.body = returnD(null, 'title or content not null')
            return
        }
        param.pub_time = Date.now() / 1000
        const res = await ctx.service.article.add(param)

        ctx.response.body = returnD(res)
    }

    async list() {
        const ctx = this.ctx
        const param = ctx.query
        param.page = param.page < 1 ? 1 : param.page
        param.size = param.size > 20 ? 10 : param.size
        
        const res = await ctx.service.article.list(param)

        ctx.body = returnD(res)
    }
    
    async total() {
        const ctx = this.ctx
        const count = await ctx.service.article.all()
        ctx.body = returnD(count[0])
    }

    async detail() {
        // 获取ip，结合logs表可以统计多少人看过
        console.log(11111, this.ctx.request.header.host)

        const res = await this.ctx.service.article.detail(this.ctx.params.id)
        // 此处简单做，不考虑重复看的次数
        await this.ctx.service.article.update({read: res.read + 1, id: this.ctx.params.id})
        this.ctx.body = returnD(res)
    }

    async del() {
        let id = this.ctx.params.id
        const res = await this.ctx.service.article.del(id)
        this.ctx.body = returnD(res)
    }

    async edit() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.title || !param.content || !param.id) {
            ctx.body = returnD(null, 'id or title or content not null')
            return
        }
        param.pub_time = Date.now() / 1000
        const res = await ctx.service.article.add(param)

        ctx.response.body = returnD(res)
    }
    
    // 上传文件
    async upload() {
        // 获取文件流
        const stream = await this.ctx.getFileStream();
        // 定义文件名
        const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
        // 目标文件
        const target = path.join('app/public/uploads', filename);
        //
        const writeStream = fs.createWriteStream(target);
        console.log('-----------获取表单中其它数据 start--------------');
        console.log(stream.fields);
        console.log('-----------获取表单中其它数据 end--------------');
        try {
          //异步把文件流 写入
          await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
          //如果出现错误，关闭管道
          await sendToWormhole(stream);
          // 自定义方法
            console.error(err)
        }
        // 自定义方法
        this.ctx.response.body = returnD({ url: '/public/uploads/' + filename })
      }
}

module.exports = ArticleController
