const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnimalesSchema = new Schema({
  id: ObjectId,
  nombre: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  nombre_cientifico: {
    type: String,
    required: true,
    match: /[a-z]/,
  },
  habitat: {
    type: String,
    required: true,
    match: /[a-z]/
  },
  peligro_extincion: {
    type: String,
    required: true,
    match: /[a-z]/
  }

});

const AnimalesModel = mongoose.model('animales', AnimalesSchema)
module.exports = AnimalesModel