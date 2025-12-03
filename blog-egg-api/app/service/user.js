const { Service } = require('egg')

class UserService extends Service {
    table = 'user'

    async get(email) {
        const user = await this.app.mysql.get(this.table, {email})

        return user
    }

    async register(data) {
        const result = await this.app.mysql.insert(this.table, data)

        return result.affectedRows === 1 ? {id: result.insertId} : null
    }

    async list() {
        const res = await this.app.mysql.select(this.table, {
            columns: ['id', 'email', 'name', 'company', 'work', 'description', 'site', 'pic']
        })
        
        return res
    }
    
    async del(id) {
        const res = await this.app.mysql.delete(this.table, {id})
    
        return res
    }
}

module.exports = UserService

