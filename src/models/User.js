const mongoose = require('mongoose')
const PointSchemma = require('./utils/pointSchemma')

const Schemma = new mongoose.Schema({

    name: {
        type: String,
        required: true,


    },
    whatsapp: {
        type: String,
        required: true,

    },
     email: {
        type: String,
        required: true,
        lowercase: true, 
     },

     password: {
        type: String,
        required: true,
     },

     location: {
        type: PointSchemma,
        index: '2dsphere',
    }
});

module.exports = mongoose.model('User', Schemma)