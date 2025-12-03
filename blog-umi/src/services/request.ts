
export default function request(url: RequestInfo | URL, data = {}, param = {}) {
    return fetch(url, Object.assign({
        method: "POST",
        // mode: "cors", // (same-origin), no-cors, cors
        // cache: "no-cache", // (default), no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", //(same-origin), include, omit
        headers: {
            "Content-Type": "application/json",
            // "timeout": "5000",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        // redirect: "follow", //(follow), manual, error
        // referrer: "no-referrer", //(client), no-referrer
        body: JSON.stringify(param), // 这里格式要与 "Content-Type" 同步
    }, data)).then(res => res.json())
}
