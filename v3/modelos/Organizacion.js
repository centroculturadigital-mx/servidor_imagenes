const mongoose = require('mongoose');

import Usuaria from "../modelos/Usuaria";
import Directorio from "../modelos/Directorio";
import Archivo from "../modelos/Archivo";
  
const OrganizacionSchema = new mongoose.Schema({
    nombre: String,
    usuarias: [Usuaria],
    directorios: [Directorio],
    archivos: [Archivo],
});
  
module.exports = mongoose.model('Organizacion', OrganizacionSchema);

