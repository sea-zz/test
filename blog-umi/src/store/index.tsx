import { atom, selector } from 'recoil'
import Cookies from 'js-cookie'

let userKey = 'blog_umi_info'

export const userInfo = atom({
    key: 'userInfo',
    default: getInfo()
})

export const userId = selector({
    key: 'userId',
    get: ({get}) => {
        const info = get(userInfo)
        
        return info.id || 0
    }
})

export function getInfo() {
    return Cookies.get(userKey) ? JSON.parse(Cookies.get(userKey)) : null
}

export function setInfo(val) {
    Cookies.set(userKey, JSON.stringify(val))
}

export function delInfo() {
    Cookies.remove(userKey)
}



