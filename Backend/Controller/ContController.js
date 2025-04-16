require("dotenv").config();
const { Cont, validateCont } = require("../Model/ContSchema");

const createContributor = (req, res)=>{
    try {
    const { error } = validateCont(req.body)
    let obj = req.body;
        if (error) {
          res.send({
            msg: "Error",
            error: error,
            isSuccess: false,
          })
        } else {
  
    
      let contData = new Cont(obj);
      contData
        .save()
        .then((data) => {

          console.log('Contributor created',data)
          res.send({
            isSuccess: true,
            message: "Contributor Created",
            Cont: data,
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

const getContributor = (req, res) => {
  try {
    console.log('in getCont');
    Cont.find()
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

const getSpecificCont = (req, res) => {
  try {
    console.log('in getSpecificCont');
    Cont.findOne({ UniqueId: req.query.UniqueId })
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

const updateCont = async (req,res)=>{
    try{

      // const id = req.query._id
      // const updatedCont = req.body

      // const existingCont = await Cont.findById(id)
      // if(!existingCont){
      //   return res.status(404).send({ isSuccess: false, message: "Contributor not found" });
      // }
      
        Cont.updateOne({_id:req.query._id},req.body)
        .then((data)=>{
            console.log(data)
            res.send({
                isSuccess: true,
                data: data
            })
        }).catch((err)=>{
            res.send({
                isSuccess: false,
                message: err
            })
        })

    //     if (updatedCont.donation) {
    //   for (let projectName in updatedCont.donation) {
    //     const amount = updatedCont.donation[projectName];
    //     // Update donation object
    //     existingCont.donation[projectName] = (existingCont.donation[projectName] || 0) + amount;

    //     // ✅ Update donationDetails
    //     existingCont.donationDetails.set(projectName, {
    //       amount: amount,
    //       date: new Date().toLocaleString("en-IN", { hour12: true }),
    //     });
    //   }
    // }

    // // ✅ Handle projectsVolunteered (prevent duplicates)
    // if (updatedCont.projectsVolunteered) {
    //   updatedCont.projectsVolunteered.forEach((project) => {
    //     if (!existingCont.projectsVolunteered.includes(project)) {
    //       existingCont.projectsVolunteered.push(project);
    //     }
    //   });
    // }

    // await existingCont.save();

    // res.send({ isSuccess: true, message: "Contributor updated successfully", updatedCont: existingCont });
  


    }catch(err){
        res.send({
            isSuccess: false,
            message: err
        })
    }
}

const updateContVerification = async (req, res) => {
  try {
    const { UniqueId, isVerified } = req.body;
    const updated = await Cont.findOneAndUpdate(
      { UniqueId },
      { isVerified },
      { new: true }
    );
    if (updated) {
      res.send({
        isSuccess: true,
        message: "Contributor verification status updated",
        cont: updated
      });
    } else {
      res.send({ isSuccess: false, message: "Contributor not found" });
    }
  } catch (err) {
    res.send({ isSuccess: false, message: err.message });
  }
};

const getUnverifiedConts = async (req, res) => {
  try {
    const conts = await Cont.find({ isVerified: false });
    res.send({
      isSuccess: true,
      contributors: conts
    });
  } catch (err) {
    res.send({
      isSuccess: false,
      message: err.message
    });
  }
};

module.exports = {createContributor, getContributor, getSpecificCont, updateCont, updateContVerification, getUnverifiedConts}