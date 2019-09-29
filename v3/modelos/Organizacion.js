const mongoose = require('mongoose');

import Usuaria from "../modelos/Usuaria";
import Proyecto from "../modelos/Proyecto";
import Acceso from "../modelos/Acceso";
  
const OrganizacionSchema = new mongoose.Schema({
    nombre: String,
    usuarias: [Usuaria],
    accesos: [Acceso],
    proyectos: [Proyecto],
});
  
module.exports = mongoose.model('Organizacion', OrganizacionSchema);

