let mongoose = require('mongoose')
let joi = require('joi')

let ProjectSchema =  mongoose.Schema({
    ProjectName: {
        type: String,
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    State: {             //Upcoming, completed
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    ProjectId: {
        type: Number
    }
})


let Project = mongoose.model("Project", ProjectSchema)
const validateProject = (Project)=> {
    const joiSchema = joi.object({
        ProjectName: joi.string()
        .required(),
        StartDate: joi.string()
        .required(),
        State: joi.string()
        .required(),
        City: joi.string()
        .required(),
        Description: joi.string()
        .required(),
        // ProjectId: joi.required()
    })
    return joiSchema.validate(Project)
}

module.exports = {Project, validateProject}