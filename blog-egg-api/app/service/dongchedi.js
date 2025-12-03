const { Service } = require('egg')

class UserZhiyao extends Service {
    table = 'dongchedi'

    async add(data) {
        const result = await this.app.mysql.insert(this.table, data)

        return result
    }

    async all() {
        const res = await this.app.mysql.query(`select count(id) as count from ${this.table}`)

        return res
    }

    // 复杂查询
    async list(data) {
        let sql = `select * from ${this.table}`
        let countSql = `select count(*) as count from ${this.table}`
        if (data.type) {
            sql += ` where outter_detail_type in(${data.type}) `
            countSql += ` where outter_detail_type in(${data.type}) `
        }
        if (data.name) {
            sql += sql.indexOf('where') !== -1 ? ` and series_name like '%${data.name}%' ` : ` where series_name like '%${data.name}%' `
            countSql += countSql.indexOf('where') !== -1 ? ` and series_name like '%${data.name}%' ` : ` where series_name like '%${data.name}%' `
        }
        if (data.price) {
            const [min, max] = data.price.split(',') // min_price max_price
            sql += sql.indexOf('where') !== -1 ? ` and min_price > ${min} and ${max} > min_price` : ` where min_price > ${min} and ${max} > min_price `
            countSql += countSql.indexOf('where') !== -1 ? ` and min_price > ${min} and ${max} > min_price` : ` where min_price > ${min} and ${max} > min_price `
        }
        sql += ` order by count desc limit ${(data.page - 1) * data.size}, ${data.size}`

        console.log(3333, sql)

        const res = await this.app.mysql.query(sql)
        const count = await this.app.mysql.query(countSql)

        return {data: res, count: count[0]}

        // const { Op } = this.app.Sequelize

        // const req = {
        //     limit: Number(data.size),
        //     offset: data.size * (data.page - 1),
        // }

        // if (data.type) {
        //     let where = {
        //         outter_detail_type: data.type.split(',')
        //     }
        // }
        // if (data.name) {
        //     where = where || {}
        //     where.series_name = data.name
        // }

        // if (data.price) {
            
        // }

        // const res = await this.app.mysql.select(this.table, req)

        // return res
    }
}

module.exports = UserZhiyao

