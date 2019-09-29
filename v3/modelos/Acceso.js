const mongoose = require('mongoose');

const PERMISOS = require('../data/PERMISOS')

import Usuaria from "../modelos/Usuaria";
  
const AccesoSchema = new mongoose.Schema({
    usuaria: Usuaria,
    permiso: { type: String, enum: PERMISOS },
    limite: Number
});
  
module.exports = mongoose.model('Acceso', AccesoSchema);

