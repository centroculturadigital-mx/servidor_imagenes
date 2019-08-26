const fs = require('fs')
const {promisify} = require('util');
const multer = require('koa-multer');

const Router = require('koa-router')

const router = Router(); //Instantiate the router

const Archivo = require('../modelos/archivo.js');



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


const unlink = promisify(fs.unlink)

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




router.get('/', async ctx => {
    await ctx.render('index', pug.locals, true)    
});
router.get('/imagenes', imagenes);
router.get('/imagen', async ctx => {
    await ctx.render('imagen', pug.locals, true)    
});



router.post('/subir', upload.single('imagen'), async ctx => {
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
        
        
        imagenes(ctx);
        
        ctx.status = 200;
        
    } catch(err) {
        console.error(err);
        
    }
    
});




router.delete('/imagen', async ctx => {
    const { id } = ctx.request.body;
    
    const archivo = await Archivo.findOne({_id:id})

    // TODO: Buscar archivo y eliminarlo
    try {
        let del = await unlink(__dirname + "/" + archivo.ruta)
        console.log(del);            
    } catch(err) {
        console.log(err);
        
    }


    archivo.remove()
    
    try {
        await imagenes( ctx );
    } catch(err) {
        console.error(err)
    }
});



router.get('*', async ctx => {
    await ctx.render('no_encontrado', pug.locals, true)    
});


module.exports = router