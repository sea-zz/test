const { Controller } = require('egg')
const { returnD } = require('../../tools/res')
var md5 = require('md5')

class DongchediController extends Controller {
    async list() {
        const { ctx } = this
        const data = ctx.request.body
        
        const ret = await ctx.service.dongchedi.list(data)
        ctx.body = returnD(ret)
    }
}

module.exports = DongchediController

