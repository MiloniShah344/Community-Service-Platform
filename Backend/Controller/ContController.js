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

const updateCont = (req,res)=>{
    try{
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
    }catch(err){
        res.send({
            isSuccess: false,
            message: err
        })
    }
}

module.exports = {createContributor, getContributor, getSpecificCont, updateCont}