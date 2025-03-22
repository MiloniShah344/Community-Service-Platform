let mongoose = require('mongoose')
let joi = require('joi')
const { Project } = require('./ProjectSchema')

let CompletedPrjSchema =  mongoose.Schema({
    Month: {
        type: String,
        required: true
    },
    Projects: {
        type: Number,
        required: true
    }
})


let CompletedPrj = mongoose.model("CompletedPrj", CompletedPrjSchema)
const validateCompletedPrj = (CompletedPrj)=> {
    const joiSchema = joi.object({
        Month: joi.string()
        .required(),
        Projects: joi.number()
        .required()
    })
    return joiSchema.validate(CompletedPrj)
}

module.exports = {CompletedPrj, validateCompletedPrj} 