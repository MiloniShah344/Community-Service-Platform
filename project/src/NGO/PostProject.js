import React, { useState } from "react";
import { TextField, Button, MenuItem, Typography, Container, Paper } from "@mui/material";
import "./PostProject.css";
import axios from 'axios'

const PostProject = () => {
    const [alert, setAlert] = useState({})
    const [update, doupdate] = useState()
  const [data, setData] = useState({
    ProjectName: "",
    StartDate: "",
    State: "Upcoming",
    City: "",
    Description: "",
  });

  const handleChange = (e) => {
    setData({ ...data, State: 'Upcoming', [e.target.name]: e.target.value });
    console.log(data)
  };

  const handleSubmit = () => {
    setData({...data, State: "Upcoming"})
    console.log("Project Submitted:", data);
    axios.post(`http://localhost:4000/createProject`, data)
            .then((res) => {
                doupdate(!update)
                console.log("res.data", res.data)

                setAlert({
                    value: true,
                    msg: res.data.isSuccess? "Project Added!":"Please enter all mandatory fields",
                    type:res.data.isSuccess? "success":"error"
                })

                setData({
    ProjectName: "",
    StartDate: "",
    State: "",
    City: "",
    Description: "",
  })
            }).catch((err) => {
                console.log("Error", err)
                setAlert({
                    value: false,
                    msg: "Error occured while adding data!",
                    type: "error"
                })
            })
  };

  return (
    <Container className="post-project-container">
      <Paper elevation={3} className="post-project-card">
        <Typography variant="h4" className="title">Post New Project</Typography>
        <br/>
        <TextField
          label="Project Name"
          name="ProjectName"
          value={data.ProjectName}
          fullWidth
          variant="outlined"
          className="input-field"
          type = "ProjectName"
          onChange = {(e)=>{handleChange(e)}}
        />
        
        <TextField
          label="Start Date"
          type="date"
          name="StartDate"
          value={data.StartDate}
          onChange = {(e)=>{handleChange(e)}}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className="input-field"
        />

        <TextField
          select
          label="State"
          name="State"
          value="Upcoming"
          onChange = {(e)=>{handleChange(e)}}
          fullWidth
          variant="outlined"
          className="input-field"
          disabled
        >
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        <TextField
          label="City"
          name="City"
          value={data.City}
          onChange = {(e)=>{handleChange(e)}}
          fullWidth
          variant="outlined"
          className="input-field"
        />

        <TextField
          label="Description"
          name="Description"
          value={data.Description}
          onChange = {(e)=>{handleChange(e)}}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          className="input-field"
        />

        <Button variant="contained" className="submit-btn" onClick={handleSubmit}>
          Post Project
        </Button>
      </Paper>
    </Container>
  );
};

export default PostProject;
