const mongoose = require('mongoose')


const complainSchema = new mongoose.Schema({
    user : {
        type : Object,
        required : true,
        ref : 'User'
    },
     complain : {
         type : String,
         required : true
     },
     date : {
         type : Date,
         required : true,
     }
})

module.exports = mongoose.model('Complain', complainSchema)