import request from './request'

export function tagALl() {
    return request(`/api/tag/all`, {method: 'GET', body: null})
}

export function getList(page: any) {
    return request(`/api/tag/list?page=${page}&size=10`, {method: 'GET', body: null})
}

export function addTag(data: {} | undefined) {
    return request(`/api/tag/add`,{}, data )
}

export function editTag(data: {} | undefined) {
    return request(`/api/tag/edit`, {}, data)
}

export function delTag(id: any) {
    return request(`/api/tag/del/${id}`, {method: 'delete', body: null})
}
