
module.exports = app => {
    const {router, controller} = app

    router.post('/user/get', controller.user.get)
    router.post('/user/login', controller.user.login)
    router.post('/user/register', controller.user.register)
    router.get('/user/test', controller.user.test)
    router.get('/user/list', controller.user.list)
    router.delete('/user/del/:id', controller.user.del)
    

    router.post('/article/add', controller.article.add)
    router.get('/article/list', controller.article.list)
    router.get('/article/detail/:id', controller.article.detail)
    router.delete('/article/del/:id', controller.article.del)
    router.post('/article/edit', controller.article.edit)
    router.post('/article/upload', controller.article.upload)
    router.get('/article/total', controller.article.total)

    router.post('/cate/add', controller.cate.add)
    router.get('/cate/list', controller.cate.list)
    router.get('/cate/all', controller.cate.all)
    router.delete('/cate/del/:id', controller.cate.del)
    router.post('/cate/edit', controller.cate.edit)
    

    router.post('/tag/add', controller.tag.add)
    router.get('/tag/list', controller.tag.list)
    router.get('/tag/all', controller.tag.all)
    router.post('/tag/edit', controller.tag.edit)
    router.delete('/tag/del/:id', controller.tag.del)

    router.post('/hot/add', controller.hot.add)
    router.get('/hot/list', controller.hot.list)

    router.get('/weibo/search', controller.weibo.search)
    router.get('/weibo/topic', controller.weibo.topic)
    router.get('/weibo/baidu', controller.weibo.baidu)
    router.get('/weibo/socialevent', controller.weibo.socialevent)
    router.get('/weibo/entrank', controller.weibo.entrank)
    
    router.get('/weibo/zhihu', controller.weibo.zhihu)
    router.get('/weibo/weather', controller.weibo.weather)
    router.get('/weibo/citycode', controller.weibo.citycode)
    
    router.get('/zhiyao/index', controller.zhiyao.index)
    router.post('/zhiyao/add', controller.zhiyao.add)
    router.get('/weibo/carrank', controller.weibo.carrank)

    router.post('/dongchedi/list', controller.dongchedi.list)
}



