export default [
    {
        path: '/',
        component: '@/layouts',
        routes: [
            {
                path: '/',
                redirect: '/',
                name: '首页',
                component: '@/pages/index'
            },
            {
                path: '/weibo',
                name: '微博',
                routes: [
                    {
                        path: '/',
                        redirect: 'weibo/search',
                    },
                    {
                        path: '/weibo/search',
                        name: '热搜榜',
                        component: '@/pages/weibo/search'
                    },
                    {
                        path: '/weibo/topic',
                        name: '话题榜',
                        component: '@/pages/weibo/topic'
                    }
                ]
            },
            {
                path: '/baidu',
                name: '百度',
            }
        ]
    },
    
]
