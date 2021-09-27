const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userroutes = require('./routes/userroutes')
const complainroutes = require('./routes/complainroutes')
require('dotenv').config({path : __dirname + '/.env'})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization')
    next()
})


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/auth', userroutes)
app.use('/complain', complainroutes)

app.use((req, res, next) => {
    const error = new Error('Page not found')
    error.statusCode = 404;
    throw error;
})

app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        error : error.message
    })
})

mongoose.connect('mongodb+srv://'+process.env['DATABASE_USERNAME']+':'+process.env['DATABASE_PWD']+'@shop.kqlba.mongodb.net/complaintDatabase?retryWrites=true&w=majority').then((_) => {
    console.log("database connected")
}).catch((_) => {
    console.log('databse connection failed')
})

module.exports = app