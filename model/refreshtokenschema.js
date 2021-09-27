const mongoose = require('mongoose')


const refreshtokenSchema = new mongoose.Schema({
        userId : {
            type : String,
            required : true
        },
        refreshtoken : {
            type : String,
            required: true
        },
        expireAt : {
            type : Date,
            default : Date.now,
            expires : 86400
        }
})

module.exports = mongoose.model('refreshToken', refreshtokenSchema)