const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors')

const router = require('./routes/Router')

const app = express()


mongoose.connect('mongodb+srv://jeancarlosrosa22:jeanrosa@cluster0.ntwogez.mongodb.net/?retryWrites=true&w=majority',
    console.log('conected to database')
    
)

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333, ()=> console.log('server running in port 3333'))