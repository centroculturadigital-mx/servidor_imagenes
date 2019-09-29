const mongoose = require('mongoose');

import Directorio from "../modelos/Directorio";
  
const ProyectoSchema = new mongoose.Schema({
    api_key: String,
    accesos: [Acceso],
    directorios: [Directorio],
});
  
module.exports = mongoose.model('Proyecto', ProyectoSchema);

