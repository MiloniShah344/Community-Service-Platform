require("dotenv").config();
const { CompletedPrj, validateCompletedPrj } = require("../Model/CompletedPrjSchema");

const createCompletedPrj = (req, res)=>{
    try {
    const { error } = validateCompletedPrj(req.body)
    let obj = req.body;
        if (error) {
          res.send({
            msg: "Error",
            error: error,
            isSuccess: false,
          })
        } else {
  
    
      let CompletedPrjData = new CompletedPrj(obj);
      CompletedPrjData
        .save()
        .then((data) => {

          console.log('CompletedPrj created',data)
          res.send({
            isSuccess: true,
            message: "CompletedPrj Created",
            CompletedPrj: data,
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

const getCompletedPrj = (req, res) => {
  try {
    console.log('in getCompletedPrj');
    CompletedPrj.find()
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

module.exports = {createCompletedPrj, getCompletedPrj}