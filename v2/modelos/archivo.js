const mongoose = require('mongoose');

const EXTENSIONES = require('../data/EXTENSIONES')

const opciones = {
    discriminatorKey: 'tipo',
    collection: 'archivo',
};
  
const ArchivoSchema = new mongoose.Schema({
    nombreOriginal: String,
    nombreArchivo: String,
    extension: { type: String, enum: EXTENSIONES },
    tipo: String,
    mimetype: String,
    destino: String,
    ruta: String,
    tamanno: String,
    codificacion: String,
}, opciones);
  
module.exports = mongoose.model('Archivo', ArchivoSchema);

