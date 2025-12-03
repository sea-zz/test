const { Service } = require('egg')

class UserZhiyao extends Service {
    table = 'zhiyao'

    async add(data) {
        const result = await this.app.mysql.insert(this.table, data)
        return result

        return result.affectedRows === 1 ? {id: result.insertId} : null
    }
}

module.exports = UserZhiyao

