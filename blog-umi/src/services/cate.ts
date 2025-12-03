import request from './request'

export function cateAll() {
    return request(`/api/cate/all`, {method: 'GET', body: null})
}

export function del(id: any) {
    return request(`/api/cate/del/${id}`, {method: 'delete'})
}

export function edit(data: {} | undefined) {
    return request(`/api/cate/edit`, {method: 'post'}, data)
}

export function addCate(data: {} | undefined) {
    return request(`/api/cate/add`, {method: 'post'}, data)
}
