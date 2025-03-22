require("dotenv").config();
const { VolGrowth, validateVolGrowth } = require("../Model/VolGrowthSchema");

const createVolGrowth = (req, res)=>{
    try {
    const { error } = validateVolGrowth(req.body)
    let obj = req.body;
        if (error) {
          res.send({
            msg: "Error",
            error: error,
            isSuccess: false,
          })
        } else {
  
    
      let VolGrowthData = new VolGrowth(obj);
      VolGrowthData
        .save()
        .then((data) => {

          console.log('VolGrowth created',data)
          res.send({
            isSuccess: true,
            message: "VolGrowth Created",
            VolGrowth: data,
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

const getVolGrowth = (req, res) => {
  try {
    console.log('in getVolGrowth');
    VolGrowth.find()
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

module.exports = {createVolGrowth, getVolGrowth}