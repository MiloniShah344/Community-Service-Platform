require("dotenv").config();
const { Project, validateProject } = require("../Model/ProjectSchema");

const createProject = (req, res)=>{
    try {
    const { error } = validateProject(req.body)
    let obj = req.body;
        if (error) {
          res.send({
            msg: "Error",
            error: error,
            isSuccess: false,
          })
        } else {
  
    
      let projectData = new Project(obj);
      projectData
        .save()
        .then((data) => {

          console.log('Project created',data)
          res.send({
            isSuccess: true,
            message: "Project Created",
            Project: data,
          });
        })
        .catch((err) => {
          console.log("--------------", err);
          res.send({
            isSuccess: false,
            message: err,
          });
        });
  }
  } catch (err) {
    console.log("error", err);
    res.send({
      isSuccess: false,
      message: err,
    });
  }

}

const getAllProjects = (req, res) => {
  try {
    console.log('in getAllProjects');
    Project.find()
      .then((val) => {
        console.log(val);
        res.send({
          isSuccess: true,
          data: val
        })

      })
      .catch((err) => {
        res.send({
          isSuccess: false,
          message: err,
        });
      });
  } catch (err) {
    res.send({
      isSuccess: false,
      message: err,
    });
  }
}

const getSpecificProject = (req, res) => {
  try {
    console.log('in getSpecificProjects')
    Project.find({ State: req.body.State })
      .then((val) => {
        console.log(val);
        res.send({
          isSuccess: true,
          data: val
        })

      })
      .catch((err) => {
        res.send({
          isSuccess: false,
          message: err,
        });
      });
  } catch (err) {
    res.send({
      isSuccess: false,
      message: err,
    });
  }
}

const getOneProject = (req, res) => {
  try {
    console.log('in getSpecificProjects')
    Project.findOne({ _id: req.body._id })
      .then((val) => {
        console.log(val);
        res.send({
          isSuccess: true,
          data: val
        })

      })
      .catch((err) => {
        res.send({
          isSuccess: false,
          message: err,
        });
      });
  } catch (err) {
    res.send({
      isSuccess: false,
      message: err,
    });
  }
}

const updateProject = (req,res)=>{
    try{
        Project.updateOne({_id:req.query._id},req.body)
        .then((data)=>{
            console.log(data)
            res.send({
                isSuccess: true,
                message: data
            })
        }).catch((err)=>{
            res.send({
                isSuccess: false,
                message: err
            })
        })
    }catch(err){
        res.send({
            isSuccess: false,
            message: err
        })
    }
}

const deleteProject = (req, res) => {
    try {
        Project.deleteOne({ _id: req.query._id })
            .then((data) => {
                console.log(data)
                res.send({
                    isSuccess: true,
                    message: data
                })
            }).catch((err) => {
                res.send({
                    isSuccess: false,
                    message: err
                })
            })
    } catch (err) {
        res.send({
            isSuccess: false,
            message: err
        })
    }
}

module.exports = {createProject, getAllProjects, getSpecificProject, getOneProject, updateProject, deleteProject}