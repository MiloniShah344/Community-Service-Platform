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

const ContributorRegister = () => {
  let navigate = useNavigate()

  const [data, setData] = React.useState({UniqueId: localStorage.getItem("UniqueId")})
  const [update, doupdate] = React.useState(true)
  const [alert, setAlert] = React.useState({
        value: false,
        msg: '',
        type: ''
    })

  const handleChange = (e, type) => {
        if (type == "name") {
            setData({ ...data, name: e.target.value })
        }
        else if (type == "age") {
            setData({ ...data, age: e.target.value })
        }
        else if (type == "city") {
            setData({ ...data, city: e.target.value })
        }
        else if (type == "gender") {
            setData({ ...data, gender: e.target.value })
        }
        else if (type == "phone") {
            setData({ ...data, phone: e.target.value })
        }
        console.log("In handle change. data: ", data)
  }

  const handleLogin = ()=>{
    navigate('/Login')
  }

  const handleSubmit = ()=>{
    window.alert("Waiting for verification!")
    console.log("In handle Submit. Data: ", data)
    navigate('/Login')
    // if(res.data.data)
    axios.post(`http://localhost:4000/ContributorRegister`, data)
            .then((res) => {
                doupdate(!update)
                console.log("res.data", res.data)

                setAlert({
                    value: true,
                    msg: res.data.isSuccess? "Contributo Added!":"Please enter all mandatory fields",
                    type:res.data.isSuccess? "success":"error"
                })
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
        <img src={RegisterPic} alt="Register" id = "img-register" />
      </div>
      <div className="form-section">
        <br/><br/>
        <h2>Contributor Register</h2>
      
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input type="text" id="name" onChange={(e)=>{handleChange(e,"name")}} required placeholder="Full Name" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input type="number" id="number" onChange={(e)=>{handleChange(e,"Age")}} required placeholder="Age" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-home"></i>
              <input type="text" id="city" onChange={(e)=>{handleChange(e,"city")}} required placeholder="City" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <i className="fas fa-home"></i>
              <input type="number" id="phone" maxLength={10} onChange={(e)=>{handleChange(e,"phone")}} required placeholder="Phone No." />
            </div>
          </div>       
          <div className="form-group">
            <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" style={{color:"#007bff"}}>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
         onChange={(e)=>{handleChange(e,"role")}} 
         required
      >
        <FormControlLabel value="NGO" control={<Radio />} label="Male" />
        <FormControlLabel value="Volunteer" control={<Radio />} label="Female" />
      </RadioGroup>
    </FormControl>
          </div>     
          <button type="submit" onClick={()=>{handleSubmit()}}>Submit</button>
     <br/><br/>
      </div>
    </div>
    </div>
  );
};

export default ContributorRegister;