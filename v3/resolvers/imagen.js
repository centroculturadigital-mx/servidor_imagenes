const fs = require('fs')
const {promisify} = require('util');
const unlink = promisify(fs.unlink)
const Archivo = require('../modelos/archivo.js');

const imagenes = async ctx => {
        
    try {

        const imagenes = await Archivo.find()
        pug.locals.imagenes = imagenes 
        
    } catch(err) {
        console.error(err);
    }

    await ctx.render('imagenes', pug.locals, true)    
}

module.exports = {

    imagenes,
    
    imagenSubir: async ctx => {
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
                
            
            
            imagenes(ctx);
            
            ctx.status = 200;
            
        } catch(err) {
            console.error(err);
            
        }
        
    },
    
    imagenEliminar: async ctx => {
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
    }


}