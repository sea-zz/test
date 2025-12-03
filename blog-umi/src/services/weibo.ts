import request from './request'

export function search() {
    return request('/api/weibo/search', {
        method: "GET",
        body: null,
    })
}

export function topic(page: any) {
    return request(`/api/weibo/topic?page=${page}&size=10`, {method: 'GET', body: null})
}

export function baidu(type: any) {
    return request(`/api/weibo/baidu?type=${type}`, {method: 'GET', body: null})
}

export function socialevent() {
    return request(`/api/weibo/socialevent`, {method: 'GET', body: null})
}

export function entrank() {
    return request(`/api/weibo/entrank`, {method: 'GET', body: null})
}

export function zhihu() {
    return request(`/api/weibo/zhihu`, {method: 'GET', body: null})
}

export function weather(adcode = '110101') {
    return request(`/api/weibo/weather?city=${adcode}`, {method: 'get', body: null})
}


export function citycode() {
    return request(`/api/weibo/citycode`, {method: 'get', body: null})
}

export function carRank() {
    return request(`/api/weibo/carrank`, {method: 'get', body: null})
}
