const koa = require('koa')
const router = require('koa-router')
const mount = require('koa-mount')
const path = require('path')
const multer = require('koa-multer');
const bodyParser = require('koa-bodyparser');
const override = require('koa-override');

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






// funcion para consultar imagenes
const imagenes = async ctx => {
    
    try {

        const imagenes = await Archivo.find()
        pug.locals.imagenes = imagenes 
        
    } catch(err) {
        console.error(err);
    }

    await ctx.render('imagenes', pug.locals, true)    
}


const appRouter = router(); //Instantiate the router

appRouter.get('/', async ctx => {
    await ctx.render('index', pug.locals, true)    
});
appRouter.get('/imagenes', imagenes);
appRouter.get('/imagen', async ctx => {
    await ctx.render('imagen', pug.locals, true)    
});




// subir archivos


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './archivos/imagenes/')
    },
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split('.')
      cb(null, file.fieldname + '_' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })

const upload = multer({
    storage: storage,
    dest: './archivos/imagenes'
});

app.use(mount('/archivos',require('koa-static')(__dirname + '/archivos')));


appRouter.post('/subir', upload.single('imagen'), async ctx => {
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
                
        ctx.status = 200;
        
    } catch(err) {
        console.error(err);
        
    }
    
});


// permitir put y delete desde <form>
app.use(bodyParser());
app.use(override());


appRouter.delete('/imagen', async ctx => {
    const { id } = ctx.request.body;
    
    const archivo = await Archivo.findOne({_id:id})
    console.log(archivo);
    
    archivo.remove()
    
    try {
        await imagenes( ctx );
    } catch(err) {
        console.error(err)
    }
});

// servir archivos



appRouter.get('/test',async ctx => {
    ctx.body="test!"
})


appRouter.get('*', async ctx => {
    await ctx.render('no_encontrado', pug.locals, true)    
});


app.use(appRouter.routes());




app.listen(5000);

app.on('error', err => {
    console.log('Server error', err);
});
console.log("Servidor de imágenes", 5000);

