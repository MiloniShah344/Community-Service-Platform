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
    },
    projectsVolunteered: {
        type: Array,
        required: false,
        default: []
    },
    donation:{
        type: Object,
        require: false,
        default: {}
    },
    UniqueId: {
        type: Number,
        require: true
    },
    donationDetails: {
    type: Map,
    of: new mongoose.Schema({
      amount: Number,
      date: String,
    }, { _id: false }),
    default: {}
  },
    isVerified: {
        type: Boolean
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
        gender: joi.string(),
        projectsVolunteered: joi.array(),
        donation: joi.object(),
        UniqueId: joi.number().required(),
        isVerified: joi.boolean().required()
        
    })
    return joiSchema.validate(Cont)
}

module.exports = {Cont, validateCont}