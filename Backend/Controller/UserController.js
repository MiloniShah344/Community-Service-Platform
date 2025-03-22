const { User, validateUser } = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require('jsonwebtoken')

const createUser = (req, res) => {
  try {
    console.log('in create User 1')
    let obj = req.body;
    let encryptedPass = bcrypt.hashSync(req.body.Password, parseInt(process.env.SALTROUNDS));

    obj.Password = encryptedPass;
    const { error } = validateUser(req.body);
    console.log('In create User')
    if (error) {
      res.send({
        msg: "Error",
        error: error,
        isSuccess: false,
      })
    } else {
      let uData = new User(obj);
      uData
        .save()
        .then((data) => {

          console.log('User created',data)
          res.send({
            isSuccess: true,
            message: "User Created",
            user: data,
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

const loginUser = (req, res) => {
  try {
    User.findOne({ UserName: req.body.UserName })
      .then((data) => {
        // console.log('Data', data, req.body.Password, data.Password);
        // console.log("==", req.body.Password == data.Password)
        // console.log("Roles: ", req.body.Role, data.Role)
        const isValidPass = bcrypt.compareSync(req.body.Password, data.Password)
        const isValidRole = (req.body.Role == data.Role)
        // console.log('isValidPass', isValidPass)
        // console.log('isValidRole', isValidRole)
        if (isValidPass && isValidRole) {
          var token = jwt.sign({ UserName: data.UserName, Password: data.Password, Role: data.Role }, process.env.PRIVATEKEY);
          // console.log('data', data)
          res.send({
            isSuccess: true,
            data: data,
            token: token
          })
        } else {
          res.send({
            isSuccess: false,
            message: "Incorrect credentials"
          })
        }

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

const getUser = (req, res) => {
  try {
    console.log('in getUser');
    User.find()
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

module.exports = { createUser, loginUser, getUser };