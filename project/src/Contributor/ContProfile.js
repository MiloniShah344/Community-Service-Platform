import React, { useState, useEffect } from "react";
import ContNavbar from './ContNavbar'
import Footer from '../Main Page/Footer'
import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import EditContDialog from "./EditContDialog";
import "./ContProfile.css";
import axios from "axios";

function ContProfile() {

  const uId = parseInt(localStorage.getItem("UniqueIdAtLogin"));
  const [contributor, setContributor] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/getSpecificCont?UniqueId=${uId}`)
      .then((res) => {
        setContributor(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching contributor data:", err);
      });
  }, [update]);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSave = (editedContributor) => {
    axios
      .put(`http://localhost:4000/updateCont?_id=${contributor._id}`, editedContributor)
      .then((res) => {
        setUpdate((prev) => !prev);
        setIsEditDialogOpen(false);
      })
      .catch((err) => {
        console.error("Error updating contributor:", err);
      });
  };

  return (
    <div className="mainBody">
          <div className="dashboard-container">
            <ContNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="mainWindow">
              <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                          <div className="sidebar-item" onClick={toggleSidebar} style={{fontWeight: 700}}>
                            <a href="/contributor-profile">Profile</a>
                          </div>
                          <div className="sidebar-item" onClick={toggleSidebar}>
                            <a href="/upcoming-project">Upcoming Projects</a>
                          </div>
                          <div className="sidebar-item" onClick={toggleSidebar}>
                            <a href="/participated-projects">Participated Projects</a>
                          </div>
                          <div className="sidebar-item" onClick={toggleSidebar}>
                            <a href="/reciepts">Reciepts</a>
                          </div>
                        </div>
              <div className="contributor-profile-container">
          {contributor ? (
            <>
              <div className="contributor-banner">
                <h1 style={{ fontFamily: "serif", fontWeight: 500, fontSize: "50px" }}>
                  {contributor.name}
                </h1>
              </div>

              <div className="contributor-details">
                <div className="detail"><strong>Age</strong><h3>{contributor.age}</h3></div>
                <div className="detail"><strong>City</strong><h3>{contributor.city}</h3></div>
                <div className="detail"><strong>Phone</strong><h3>{contributor.phone}</h3></div>
                <div className="detail"><strong>Gender</strong><h3>{contributor.gender}</h3></div>
              </div>

              <div className="contributor-extra">
                <div className="extra-block">
                  <strong>Volunteered Projects</strong>
                  <ul>
                    {contributor.projectsVolunteered?.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="extra-block">
                  <strong>Donations</strong>
                  <ul>
                    {contributor.donation && Object.entries(contributor.donation).map(([project, amount], i) => (
                      <li key={i}>{project}: ₹{amount}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="contributor-actions">
                <Button className="edit-btn" onClick={handleEdit} startIcon={<Edit />}>
                  Edit
                </Button>
              </div>
            </>
          ) : (
            <h2 className="no-contributor-text">No Contributor Data Available</h2>
          )}
            </div>
          </div>
          </div>
          {isEditDialogOpen && (
        <EditContDialog contributor={contributor} onClose={handleCloseDialog} handleSave={handleSave} />
      )}
          <Footer />
          </div>
  )
}

export default ContProfile