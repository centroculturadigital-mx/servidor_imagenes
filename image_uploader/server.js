const Koa = require('koa');
const uploader = require('koa-file-uploader');

const app = new Koa();

const path = require('path');
const Router = require('koa-router');
const router = new Router();
// const open = require("open");

const views = require('koa-views');

app.host = process.env.IP || '127.0.0.1';
app.port = process.env.PORT || 8000;


app.use(uploader({
	cors: true,
	allowedSize: 1500,
	allowedExt: ['.png', '.jpg', '.gif'],
	destPath: path.join(__dirname, './img-folder'),
	uploadParam: 'img',
	apiPath: '/api/upload',
	returnPrefix: '/api/v1/img-folder',
	fnComplete: function(a,b) { console.log(a,b) },
	// saveAsMd5: true
}));


app.use(views(__dirname));

router.get('/', async (ctx, next) => {
    await ctx.render('demo/index.html');
});
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(app.port);

console.log("Image uploader running in port", app.port);

// const server = app.listen(app.port, app.host, () => {
//     open('http://127.0.0.1:8000');
//   console.log('Koa server listening on %s:%d', server.address().address, server.address().port);
// });