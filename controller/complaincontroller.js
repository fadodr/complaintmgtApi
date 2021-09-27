const Complain = require('../model/complainschema')
const err = require('../util/error')

exports.send_complain = async (req, res, next) => {
    const user = req.body.userId;
    const complain = req.body.complain

    try {
        const newcomplain = new Complain({
            user,
            complain,
            date : new Date(new Date().getTime()).toISOString()
        })

        const createdcomplain = await newcomplain.save()
        res.status(201).json({
            message : "New complaint sent successfully",
            complainSent : createdcomplain
        })
    }
    catch(error){
        err.catchallerror(error, res)
    }
}

exports.get_complaints = async (req, res, next) => {
    try {
        const extractedcomplaints = await Complain.find().populate('user', ['name', 'email'])
        if(extractedcomplaints.length === 0) {
            res.status(200).json({
                message : "No complaint available yet"
            })
        }
        res.status(200).json({
            messaage: 'All complaints feteched',
            extractedComplaints : extractedcomplaints
        })
    }
    catch (error) {
        err.catchallerror(error, res)
    }
}

exports.get_user_complaints = async (req, res, next) => {
    try {
        const extractedcomplaints = await Complain.find({user : req.params.userId}).populate('user', 'name')
        if(extractedcomplaints.length === 0) {
            res.status(200).json({
                message : "No complaints for the specified user yet"
            })
        }
        res.status(200).json({
            message: 'Complaints feteched successfully',
            extractedComplaints : extractedcomplaints
        })
    }
    catch (error) {
        err.catchallerror(error, res)
    }
}

exports.delete_user_complaint = async (req, res, next) => {
    try {
        await Complain.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Complaint deleted successfully',
        })
    }
    catch (error) {
        err.catchallerror(error , res)
    }
}