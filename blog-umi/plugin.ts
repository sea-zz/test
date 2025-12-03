import { IApi } from 'umi';

export default (api: IApi) => {
    api.addHTMLHeadScripts(() => {
        return {
            type: 'text/javascript',
            src: '/public/js/l2d.js',
        }
    })

    api.addHTMLHeadScripts(() => {
        return {
            type: 'text/javascript',
            src: '/public/js/pio.js',
        }
    })

    api.addHTMLLinks(() => {
        return {
            rel: 'stylesheet',
            type: 'text/css',
            src: '/public/css/pio.css',
        }
    })
}
