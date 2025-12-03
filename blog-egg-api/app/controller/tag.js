const await = require('await-stream-ready/lib/await')
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
        const res = await ctx.service.tag.add(param)

        ctx.response.body = returnD(res)
    }

    async all() {
        const ctx = this.ctx
        const param = ctx.query
        const res = await ctx.service.tag.all(param)

        ctx.body = returnD(res)
    }

    async list() {
        const ctx = this.ctx
        const param = ctx.query
        param.page = param.page < 1 ? 1 : param.page
        param.size = param.size > 20 ? 10 : param.size
        
        const res = await ctx.service.tag.list(param)
        const total = await ctx.service.tag.count()

        ctx.body = returnD({res, total: total[0].count})
    }

    async detail() {
        const res = await this.ctx.service.tag.detail(this.ctx.params.id)
        this.ctx.body = returnD(res)
    }

    async del() {
        const res = await this.ctx.service.tag.del(this.ctx.params.id)
        this.ctx.body = returnD(res)
    }

    async edit() {
        const ctx = this.ctx
        const param = ctx.request.body
        if (!param.name || !param.id) {
            ctx.body = returnD(null, 'id or name not null')
            return
        }
        const res = await ctx.service.tag.update(param)

        ctx.response.body = returnD(res)
    }
}

module.exports = CateController
