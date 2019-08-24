const koa = require('koa')
const router = require('koa-router')
const path = require('path')

const app = new koa();


const Pug = require('koa-pug');

const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    locals: {},
    //    basedir: './views',
    app: app
});


pug.locals.locale = 'es_MX'


const appRouter = router(); //Instantiate the router

// appRouter.get('/test',  getIndex); // Define routes
app.use(async ctx => {
    await ctx.render('index', pug.locals, true)
})


appRouter.use((ctx, next) => {
    return next().catch(err => {
      ctx.status = err.status || 500;
      return ctx.render('error', {
        message: err.message,
        error: err
      });
    })
  });
  
  appRouter.get('/url', ctx => {
    ctx.body = 'A random URL';
    
    // ctx.render('index', locals, true)
    
  });
  
  appRouter.use(ctx => {
    var err = new Error('Not Found');
    ctx.throw(err, 404);
  });


app.use(appRouter.routes());

app.listen(5000);

console.log("image server", 5000);
