const koa = require('koa')
const router = require('koa-router')
const path = require('path')
const multer = require('koa-multer');
const Archivo = require('./modelos/archivo.js');

const mongoose = require('mongoose');


mongoose.connect(`mongodb://mongo:27017/jcf`, {
  useNewUrlParser: true
});

mongoose.connect(`mongodb://mongo:27017/jcf`, {
  useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected. App running.'));


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
    
    try {

        const imagenes = await Archivo.find()
        pug.locals.imagenes = imagenes 
        
        console.log(imagenes);
    } catch(err) {
        console.error(err);
    }

    await ctx.render('imagenes', pug.locals, true)    
});
appRouter.get('/imagen', async ctx => {
    await ctx.render('imagen', pug.locals, true)    
});
appRouter.get('*', async ctx => {
    await ctx.render('no_encontrado', pug.locals, true)    
});




// uploads




const upload = multer({ dest: './uploads/'});

appRouter.post('/upload', upload.single('image'), async ctx => {
    try {
        
        const { file } = ctx.req;

        
        const extension = file.originalname.split('.')[file.originalname.split('.').length-1];

        const datosArchivo = {
            nombreOriginal: file.originalname,
            nombreArchivo: `${file.filename}.${extension}`,
            extension,
            tipo: file.fieldname,
            mimetype: file.mimetype,
            destino: file.destination,
            ruta: file.path,
            tamanno: file.size,
            codificacion: file.encoding
        };
        
        let archivo = await Archivo.create(datosArchivo);
        
        console.log(archivo);
        
        ctx.status = 200;
        
    } catch(err) {
        console.error(err);
        
    }

});


app.use(appRouter.routes());




app.listen(5000);

app.on('error', err => {
    console.log('Server error', err);
});
console.log("image server", 5000);

