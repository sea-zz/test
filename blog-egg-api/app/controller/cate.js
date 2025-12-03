const { Controller } = require('egg')
const { returnD } = require('../../tools/res')

class CateController extends Controller {
    async add() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.name) {
            ctx.body = returnD(null, 'name not null')
            return
        }
        const res = await ctx.service.cate.add(param)

        ctx.response.body = returnD(res)
    }

    async all() {
        const ctx = this.ctx
        const param = ctx.query
        const res = await ctx.service.cate.all(param)

        ctx.body = returnD(res)
    }

    async list() {
        const ctx = this.ctx
        const param = ctx.query
        param.page = param.page < 1 ? 1 : param.page
        param.size = param.size > 20 ? 10 : param.size
        
        const res = await ctx.service.cate.list(param)

        ctx.body = returnD(res)
    }

    async detail() {
        const res = await this.ctx.service.cate.detail(this.ctx.params.id)
        this.ctx.body = returnD(res)
    }

    async del() {
        let id = this.ctx.params.id
        const one = await this.ctx.service.cate.get(id)
        if (one) {
            this.ctx.body = returnD(null, '存在子集不许删除')
            return 
        }
        
        const res = await this.ctx.service.cate.del(id)
        this.ctx.body = returnD(res)
    }

    async edit() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.title || !param.content || !param.id) {
            ctx.body = returnD(null, 'id or title or content not null')
            return
        }
        const res = await ctx.service.cate.update(param)

        ctx.response.body = returnD(res)
    }
}

module.exports = CateController
