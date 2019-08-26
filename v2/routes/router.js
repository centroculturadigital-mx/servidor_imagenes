
const Router = require('koa-router')
const router = Router(); //Instantiate the router


router.get('/', async ctx => {
    await ctx.render('index', pug.locals, true)    
});


const imagenApi = require('../api/imagen')

imagenApi(router)

router.get('*', async ctx => {
    await ctx.render('no_encontrado', pug.locals, true)    
});


module.exports = router