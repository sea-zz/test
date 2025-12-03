const { Service} = require('egg')
const Sequelize = require('sequelize');

class CateService extends Service {
    table = 'feidian'

    async add(data) {
        const res = await this.app.mysql.insert(this.table, data)

        return res.affectedRows === 1 ? {id: res.insertId} : res
    }

    // 复杂查询
    async list(data) {
        const { Op } = this.app.Sequelize

        const req = {
            limit: Number(data.size),
            offset: data.size * (data.page - 1),
        }
        // 只能是sesquelize结构的数据才可以吗？
        // if (data.query) {
        //     req.where = {
        //         title:{ [Op.like]: `%${data.query}%`}, 
        //         // content: {[Op.like]: `%${data.query}%`}
        //     }
        // }

        const res = await this.app.mysql.select(this.table, req)

        return res
    }

    async detail(id) {
        return await this.app.mysql.get(this.table, {id})
    }

    async del(id) {
        const res = await this.app.mysql.delete(this.table, {id})
        return res.affectedRows === 1 ? res : null
    }

    async update(data) {
        const res = await this.app.mysql.update(this.table, data)
        return res.affectedRows === 1 ? res : null
    }
}

module.exports = CateService
