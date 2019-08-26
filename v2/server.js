const koa = require('koa')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser');
const override = require('koa-override');

const Archivo = require('./modelos/archivo.js');


const db = require('./db/db');



const app = new koa();

const pug_load = require('./views/pug');

pug = pug_load(app)



const router = require('./routes/router')

// const api = require('./api/imagen')



app.use(mount('/archivos',require('koa-static')(__dirname + '/archivos')));



// permitir put y delete desde <form>
app.use(bodyParser());
app.use(override());


// servir archivos





app.use(router.routes());




app.listen(5000);

app.on('error', err => {
    console.log('Server error', err);
});
console.log("Servidor de imágenes", 5000);

