import React from 'react';
import './LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import RegisterPic from './RegisterPic.jpg';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RegistrationForm = () => {
  let navigate = useNavigate()

  const [data, setData] = React.useState({UniqueId: Date.now()})
  const [update, doupdate] = React.useState(true)
  const [alert, setAlert] = React.useState({
    value: false,
    msg: '',
    type: ''
  })
  const [value, setValue] = React.useState();
  

  const handleChange = (e, type) => {

    
    if (type == "username") {
      setData({ ...data, UserName: e.target.value })
    }
    else if (type == "email") {
      setData({ ...data, Email: e.target.value })
    }
    else if (type == "password") {
      setData({ ...data, Password: e.target.value })
    }
    else if (type == "role") {
      setData({ ...data, Role: e.target.value })
    }
    console.log("In handle change. data: ", data)
  }

  const handleLogin = () => {
    navigate('/Login')
  }

  const handleNext = () => {
    localStorage.setItem("UniqueId", data.UniqueId)
    console.log("In handle Next. Data: ", data)
    axios.post('http://localhost:4000/register', data)
      .then((res) => {
        doupdate(!update)
        console.log("res.data", res.data)
        setAlert({
          value: true,
          msg: res.data.isSuccess ? "User Added!" : "Please enter all mandatory fields",
          type: res.data.isSuccess ? "success" : "error"
        })
        if (data.Role == "NGO") {
          console.log("In NGO Register")
          navigate('/NGORegister')
        }
        else if (data.Role == "Contributor") {
          console.log("In Contributor Register")
          navigate('/ContributorRegister')
        }
        else {
          window.alert("Please Select Role!")
        }

      }).catch((err) => {
        console.log("Error", err)
        setAlert({
          value: false,
          msg: "Error occured while adding data!",
          type: "error"
        })
      })

      
        
  }

  return (
    <div className="background">
      <div className="login-container">
        <div className="image-section">
          <img src={RegisterPic} alt="Register" id="img-register" />
        </div>
        <div className="form-section">
          <h2>Create Account</h2>

          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input type="text" id="username" onChange={(e) => { handleChange(e, "username") }} required placeholder="Username" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input type="email" id="email" onChange={(e) => { handleChange(e, "email") }} required placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input type="password" id="password" onChange={(e) => { handleChange(e, "password") }} required placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: "#007bff" }}>Role</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => { handleChange(e, "role") }}
                required
              >
                <FormControlLabel value="NGO" control={<Radio />} label="NGO" />
                <FormControlLabel value="Contributor" control={<Radio />} label="Contributor" />
              </RadioGroup>
            </FormControl>
          </div>
          <button type="submit" onClick={() => { handleNext() }}>Next</button>
          <br /><br />
          Already a user?
          <button onClick={() => { handleLogin() }}>Login</button>

        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;