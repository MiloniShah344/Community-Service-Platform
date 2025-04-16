let mongoose = require('mongoose')
let joi = require('joi')

let UserSchema =  mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    UniqueId: {
        type: Number
    },
    isVerified: {        
        type: Boolean,
        required: true,
        default: false
    }
})


let User = mongoose.model("User", UserSchema)
const validateUser = (User)=> {
    const joiSchema = joi.object({
        UserName: joi.string()
        .max(100)
        .min(2)
        .alphanum()
        .required(),
        Email: joi.string()
        .min(5)
        .max(20),
        Password: joi.string()
        .required(),
        Role: joi.string()
        .required(),
        UniqueId: joi.required(),
        isVerified: joi.boolean().required()
    })
    return joiSchema.validate(User)
}

module.exports = {User, validateUser}