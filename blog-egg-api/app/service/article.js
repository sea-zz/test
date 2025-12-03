const { Service} = require('egg')
const Sequelize = require('sequelize');

class ArticleService extends Service {
    table = 'article'
    cates = 'cates'
    tags = 'tags'

    async add(data) {
        const res = await this.app.mysql.insert(this.table, data)

        return res.affectedRows === 1 ? {id: res.insertId} : res
    }
    
    async all() {
        const res = await this.app.mysql.query(`select count(id) as count from ${this.table}`)

        return res
    }

    // 复杂查询
    async list(data) {
        const { Op } = this.app.Sequelize

        const req = {
            orders: [['pub_time', 'desc']],
            limit: Number(data.size),
            offset: data.size * (data.page - 1),
            columns: [ 'id', 'title', 'pub_time', 'uid', 'read' ]       
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
        const res = await this.app.mysql.get(this.table, {id})
        if (!res) {
            return res
        }
        res.cates_arr = res.cate ? await this.app.mysql.select(this.cates, {where: {
            id: res.cate.split(',')
        }}) : []
        res.tags_arr = res.tags ? await this.app.mysql.select(this.tags, {where: {
            id: res.tags.split(',')
        }}) : []

        const uinfo = await this.app.mysql.get('user', {id: res.uid})
        res.creater = uinfo ? uinfo.name : '小镇出题家'
        return res
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

module.exports = ArticleService
