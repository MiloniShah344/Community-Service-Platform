import React from 'react';
import { useNavigate } from 'react-router-dom'
import './LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import pic1 from './pic1.jpg'
import axios from 'axios'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const LoginForm = () => {
  let navigate = useNavigate()

  const [data, setData] = React.useState()
  const [update, doupdate] = React.useState(true)
  const [alert, setAlert] = React.useState({
    value: false,
    msg: '',
    type: ''
  })

  const handleChange = (e, type) => {

    if (type == "username") {
      setData({ ...data, UserName: e.target.value })
    }
    else if (type == "password") {
      setData({ ...data, Password: e.target.value })
    }
    else if (type == "role") {
      setData({ ...data, Role: e.target.value })
    }
    console.log("In handleChange. Data: ", data)
  }

  const handleRegister = () => {
    navigate('/Register')
  }

  const handleLogin = () => {
    console.log("Data")
    axios.post('http://localhost:4000/login', data)
      .then((res) => {
        doupdate(!update)
        console.log("res.data in handlelogin", res.data)
        console.log("res.data.data.UniqueId", res.data.data.UniqueId)
        console.log("res.data.token",res.data.token)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("UniqueIdAtLogin", res.data.data.UniqueId)
        setAlert({
          value: true,
          msg: res.data.isSuccess ? "User Added!" : "Please enter all mandatory fields",
          type: res.data.isSuccess ? "success" : "error"
        })
        if(res.data.isSuccess){
            if (data.Role == "NGO") {
          console.log("In NGO Register")   
          navigate('/NGODashboard')
          
        }
        else if (data.Role == "Contributor") {
          console.log("In Contributor Register")
          navigate('/ContributorDashboard')
        }
        }
        else{
          window.alert("Incorrect Credentials!")
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
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="background">
      <div className="login-container">
        <div className="form-section">
          <h2>Welcome Back!</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-user"></i>
                <input type="text" id="username" onChange={(e) => handleChange(e, "username")} required placeholder="Username" />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <input type="password" id="password" onChange={(e) => handleChange(e, "password")} required placeholder="Password" />
              </div>
            </div>
            <div className="form-group">
              <FormControl>
                <FormLabel id="role-label" style={{ color: "#007bff" }}>Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="role-label"
                  name="role"
                  onChange={(e) => handleChange(e, "role")}
                  required
                >
                  <FormControlLabel value="NGO" control={<Radio />} label="NGO" />
                  <FormControlLabel value="Contributor" control={<Radio />} label="Contributor" />
                </RadioGroup>
              </FormControl>
            </div>
            <button type="submit">Login</button>
            <br /><br />
            Not a User?
            <button type="button" onClick={handleRegister}>Register</button>
          </form>
        </div>
        <div className="image-section">
          <img src={pic1} alt="Login" id="img-login" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;