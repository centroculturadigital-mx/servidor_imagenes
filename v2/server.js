const koa = require('koa')
const router = require('koa-router')
const path = require('path')

const app = new koa();


const Pug = require('koa-pug');

const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    basedir: path.resolve(__dirname, './views'),
    locals: {},
    //    basedir: './views',
    app: app
});


pug.locals.locale = 'es_MX'


const appRouter = router(); //Instantiate the router

appRouter.get('/', async ctx => {
    await ctx.render('index', pug.locals, true)    
});
appRouter.get('/imagenes', async ctx => {
    await ctx.render('imagenes', pug.locals, true)    
});
appRouter.get('*', async ctx => {
    await ctx.render('no_encontrado', pug.locals, true)    
});


app.use(appRouter.routes());

app.listen(5000);

console.log("image server", 5000);
