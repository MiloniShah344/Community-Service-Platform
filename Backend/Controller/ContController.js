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

module.exports = {createContributor, getContributor}