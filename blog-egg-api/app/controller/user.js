const { Controller } = require('egg')
const { returnD } = require('../../tools/res')
var md5 = require('md5')

class UserController extends Controller {
    async get() {
        const ctx = this.ctx
        // let email = ctx.query.email // get
        let email = ctx.request.body.email // post
        const user = await ctx.service.user.get(email)

        ctx.body = returnD(user)
    }

    async login() {
        const ctx = this.ctx
        const p = ctx.request.body
        const user = await ctx.service.user.get(p.email)
        
        if (user && user.pass === md5(p.pass)) {
            ctx.response.body = returnD(user)
        } else {
            ctx.response.body = returnD(null)
        }
    }

    async register() {
        const param = this.ctx.request.body
        const exists = await this.ctx.service.user.get(param.email)
        if (exists) {
            this.ctx.response.body = returnD(null, 'email exists')
            return
        }

        param.pass = md5(param.pass)
        const res = await this.ctx.service.user.register(param)

        this.ctx.body = returnD(res)
    }

    async list() {
        const { ctx } = this
        const ret = await ctx.service.user.list()
        ctx.body = returnD(ret)
    }

    async del()  {
        const { ctx } = this
        let id = ctx.params.id
        const ret = await ctx.service.user.del(id)
        ctx.body = returnD(ret)
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
}

module.exports = UserController

