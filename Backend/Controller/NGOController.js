require("dotenv").config();
const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const { NGO, validateNGO } = require("../Model/NGOSchema");

const createNGO = (req, res)=>{
    try {
    const { error } = validateNGO(req.body)
    let obj = req.body;
        if (error) {
          res.send({
            msg: "Error",
            error: error,
            isSuccess: false,
          })
        } else {
  
    
      let ngoData = new NGO(obj);
      ngoData
        .save()
        .then((data) => {

          console.log('NGO created',data)
          res.send({
            isSuccess: true,
            message: "NGO Created",
            NGO: data,
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

const getNGO = (req, res) => {
  try {
    console.log('in getNGO');
    NGO.find()
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

const getSpecificNGO = (req, res) => {
  try {
    console.log('in getNGO');
    NGO.findOne({ UniqueId: req.body.UniqueId })
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

module.exports = {createNGO, getNGO, getSpecificNGO}