import request from './request'

export function search(page) {
    return request(`/api/zhiyao/index?page=${page}`, {
        method: "GET",
        body: null,
    })
}

export function add(data) {
    return request(`/api/zhiyao/add`, {
        method: "POST",
    }, data)
}

export function list(data) {
    return request(`/api/dongchedi/list`, {
        method: "POST",
    }, data)
}
