const mongoose = require('mongoose');

import Organizacion from "../modelos/Organizacion";
import Directorio from "../modelos/Directorio";
import Archivo from "../modelos/Archivo";
  
const UsuariaSchema = new mongoose.Schema({
    nombre_usuaria: String,
    nombres: String,
    apellidos: String,
    contrasenna: String,
    avatar: String,

    organizaciones: [Organizacion],
    directorios: [Directorio],
    archivos: [Archivo],
});
  
module.exports = mongoose.model('Usuaria', UsuariaSchema);

