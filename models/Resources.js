const { Schema, model } = require('mongoose')

const ResourcesShema = Schema({
  titulo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },

  imagen: {
    url: String,
    public_id: String
  }
})

module.exports = model('resources', ResourcesShema)