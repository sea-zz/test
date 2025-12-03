const { Controller } = require('egg')
const { returnD } = require('../../tools/res')

class CateController extends Controller {
    async add() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.content) {
            ctx.body = returnD(null, 'content not null')
            return
        }
        const res = await ctx.service.hot.add(param)

        ctx.response.body = returnD(res)
    }

    async list() {
        const ctx = this.ctx
        const param = ctx.query
        param.page = param.page < 1 ? 1 : param.page
        param.size = param.size > 20 ? 10 : param.size
        
        const res = await ctx.service.hot.list(param)

        ctx.body = returnD(res)
    }

    async detail() {
        const res = await this.ctx.service.hot.detail(this.ctx.params.id)
        this.ctx.body = returnD(res)
    }

    async del() {
        const res = await this.ctx.service.hot.del(this.ctx.params.id)
        this.ctx.body = returnD(res)
    }

    async edit() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.title || !param.content || !param.id) {
            ctx.body = returnD(null, 'id or title or content not null')
            return
        }
        const res = await ctx.service.hot.update(param)

        ctx.response.body = returnD(res)
    }
}

module.exports = CateController
