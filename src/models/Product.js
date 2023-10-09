const mongoose = require('mongoose');
const PointSchemma = require('./utils/pointSchemma');

const Schemma = new mongoose.Schema({

    name: {
        type: String,
        required: true,


    },
    price: {
        type: Number,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    location: {
        type: PointSchemma,
        index: '2dsphere',
    },

    order: {
        type: Number,
    }
});

module.exports = mongoose.model('Products', Schemma)