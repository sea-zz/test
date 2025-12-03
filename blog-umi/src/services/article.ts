import request from './request'

export function list(page: number) {
    return request(`/api/article/list?page=${page}&size=10`, {method: 'GET', body: null})
}

export function detail(id: any) {
    return request(`/api/article/detail/${id}`, {method: 'GET', body: null})
}

export function addArticle(data: {} | undefined) {
    return request(`/api/article/add`, {}, data)
}

export function del(id: any) {
    return request(`/api/article/del/${id}`, {method: 'delete'})
}

export function getTotal() {
    return request(`/api/article/total`, {method: 'get', body: null})
}

export function upload(file: {} | undefined) {
    return fetch('/api/article/upload', {
        method: "POST",
        // mode: "cors", // (same-origin), no-cors, cors
        // cache: "no-cache", // (default), no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", //(same-origin), include, omit
        // headers: {
        //     "Content-Type": false,
        //     // "Content-Type": "application/x-www-form-urlencoded",
        // },
        // redirect: "follow", //(follow), manual, error
        // referrer: "no-referrer", //(client), no-referrer
        body: file, // 这里格式要与 "Content-Type" 同步
    }).then(res => res.json())

    // return request(`/api/article/upload`, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         // "Content-Type": "application/x-www-form-urlencoded",
    //     },
    // }, files)
}

