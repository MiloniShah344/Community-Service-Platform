import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import NGONavbar from "./NGONavbar";
import Footer from "../Main Page/Footer";
import "./NGOProfile.css";
import axios from 'axios'

const NGOProfile = () => {

  let token = localStorage.getItem("token")
  let uId = parseInt(localStorage.getItem("UniqueIdAtLogin"))
  let UniqueId = {"UniqueId" : uId}

  const [ngo, setNgo] = useState({})

 useEffect(() => {
    axios.post(`http://localhost:4000/getSpecificNGO`, UniqueId)
    .then((res) => {
        console.log("res.data.data in setNgo", res.data.data)
        console.log("token",token)
        console.log("UniqueId", UniqueId)
        setNgo(res.data.data)
      }).catch((err) => {
        console.log("Error", err)
        
      })
}, [])


  // Dummy NGO Object
  // const [ngo, setNgo] = useState({
  //   NGOName: "Helping Hands Foundation",
  //   YearOfEstablishment: "2012",
  //   City: "Ahmedabad",
  //   Contact: "+91 98765 43210",
  // });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle Edit Click
  const handleEdit = () => {
    console.log("Edit clicked for NGO:", ngo);
  };

  // Handle Delete Click
  const handleDelete = () => {
    console.log("Delete clicked. NGO removed.");
    setNgo(null); // Remove NGO data
  };

  return (
    <div className="mainBody">
      <div className="dashboard-container">
        <NGONavbar toggleSidebar={toggleSidebar} />
        <div className="mainWindow">
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-item" onClick={toggleSidebar} style={{ fontWeight: 700 }}>
              <a href="/profile">Profile</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/post-project">Post Project</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/manage-projects">Manage Projects</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/view-volunteers">View Volunteers</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/manage-donations">View Donations</a>
            </div>
          </div>

          <div className="ngo-profile-container">
            {ngo ? (
              <>
                {/* Banner */}
                <div className="ngo-banner">
                  <h1 style={{fontFamily: "serif", fontWeight: 500, fontSize: "50px"}}>{ngo.NGOName}</h1>
                </div>

                {/* NGO Details */}
                <div className="ngo-details">
                  <div className="detail">
                    <strong>Year of Establishment</strong> 
                    <h3>{ngo.YearOfEstablishment}</h3>
                  </div>
                  <div className="detail">
                    <strong>City</strong>
                    <h3> {ngo.City}</h3>
                  </div>
                  <div className="detail">
                    <strong>Contact:</strong>
                    <h3>{ngo.Contact}</h3>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="ngo-actions">
                  <Button className="edit-btn" onClick={handleEdit} startIcon={<Edit />}>
                    Edit
                  </Button>
                  <Button className="delete-btn" onClick={handleDelete} startIcon={<Delete />}>
                    Delete
                  </Button>
                </div>
              </>
            ) : (
              <h2 className="no-ngo-text">No NGO Data Available</h2>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NGOProfile;
