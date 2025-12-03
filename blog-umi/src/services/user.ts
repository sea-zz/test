import request from './request'

export function getInfo(data: Object) {
    return request(`/api/user/login`, {}, data)
}

export function getAll() {
    return request(`/api/user/list`, {method:'get', body: null})
}


export function add(data: Object) {
    return request(`/api/user/register`, {}, data)
}

export function del(id: Number) {
    return request(`/api/user/del/${id}`, {method: 'delete', body: null}, {})
}

