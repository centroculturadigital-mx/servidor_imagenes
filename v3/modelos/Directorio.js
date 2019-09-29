const mongoose = require('mongoose');

import Archivo from "../modelos/Archivo";
import Acceso from "../modelos/Acceso";
  
const DirectorioSchema = new mongoose.Schema({
    nombre: String,
    archivos: [Archivo],
    accesos: [Acceso],
    publico: Boolean
});
  
module.exports = mongoose.model('Directorio', DirectorioSchema);

