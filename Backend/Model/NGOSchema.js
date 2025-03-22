let mongoose = require('mongoose')
let joi = require('joi')

let NgoSchema =  mongoose.Schema({
    NGOName: {
        type: String,                       
        required: true
    },
    YearOfEstablishment: {
        type: Number,
        required: true
    },
    City: {
        type: String
    },
    Contact: {
        type: Number
    },
    UniqueId: {
        type: Number
    }
})


let NGO = mongoose.model("NGO", NgoSchema)
const validateNGO = (NGO)=> {
    const joiSchema = joi.object({
        NGOName: joi.string()
        .required(),
        YearOfEstablishment: joi.number()
        .min(1800)
        .max(2026),
        City: joi.string()
        .required(),
        Contact: joi.number()
        .min(7000000000)
        .max(9999999999)
        .required(),
        UniqueId: joi.required()
    })
    return joiSchema.validate(NGO)
}

module.exports = {NGO, validateNGO}