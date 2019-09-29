const router = require('../routes/router')

const multer = require('koa-multer');

const { imagenes, imagenSubir, imagenEliminar } = require('../resolvers/imagen')

const api = (router) => {
  

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


  // module.exports = (router,upload)


  router.get('/imagenes', imagenes);
  router.get('/imagen', async ctx => {
    await ctx.render('imagen')    
  });
  router.post('/subir', upload.single('imagen'), imagenSubir );
  router.delete('/imagen', imagenEliminar);

}

module.exports = api