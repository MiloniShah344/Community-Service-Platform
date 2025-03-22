let mongoose = require('mongoose')
let joi = require('joi')

let VolGrowthSchema =  mongoose.Schema({
    Month: {
        type: String,
        required: true
    },
    Volunteers: {
        type: Number,
        required: true
    }
})


let VolGrowth = mongoose.model("VolGrowth", VolGrowthSchema)
const validateVolGrowth = (VolGrowth)=> {
    const joiSchema = joi.object({
        Month: joi.string()
        .required(),
        Volunteers: joi.number()
        .required()
    })
    return joiSchema.validate(VolGrowth)
}

module.exports = {VolGrowth, validateVolGrowth} 