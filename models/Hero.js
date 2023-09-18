const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const HeroShema = Schema({
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
  },
})

module.exports = model('hero', HeroShema)