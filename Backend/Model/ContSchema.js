let mongoose = require('mongoose')
let joi = require('joi')

let ContSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    }
})

let Cont = mongoose.model("Cont", ContSchema)
const validateCont = (Cont)=> {
    const joiSchema = joi.object({
        name: joi.string()
        .required(),
        age: joi.number()
        .min(15)
        .required(),
        city: joi.string(),
        phone: joi.number()
        .min(7000000000)
        .max(9999999999),
        gender: joi.string()
    })
    return joiSchema.validate(Cont)
}

module.exports = {Cont, validateCont}