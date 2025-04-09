import React, { useState, useEffect } from 'react';
import ContNavbar from './ContNavbar';
import Footer from '../Main Page/Footer';
import axios from 'axios';
import './ParticipatedProjects.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Slide,
  DialogActions,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ParticipatedProjects = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [participatedProjects, setParticipatedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const uniqueId = localStorage.getItem("UniqueIdAtLogin");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (uniqueId) {
      axios
        .get(`http://localhost:4000/getSpecificCont?UniqueId=${uniqueId}`)
        .then((res) => setUser(res.data.data))
        .catch((err) => console.error("Error fetching contributor:", err));
    }
  }, [uniqueId]);

  useEffect(() => {
    axios
      .post(`http://localhost:4000/getSpecificProject`, { State: "Upcoming" }) // or any State, depending on your logic
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.log("Error fetching projects:", err));
  }, []);

  useEffect(() => {
    if (user && projects.length > 0) {
      const filtered = projects.filter((proj) => {
        return (
          user.projectsVolunteered.includes(proj.ProjectName) ||
          (user.donation && user.donation[proj.ProjectName])
        );
      });
      setParticipatedProjects(filtered);
    }
  }, [user, projects]);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDetailsDialog(true);
  };

  return (
    <div className="mainBody">
      <div className="dashboard-container">
        <ContNavbar toggleSidebar={toggleSidebar} />
        <div className="mainWindow participated-container">
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-item" onClick={toggleSidebar}>
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

          <h2 className="participated-heading">Participated Projects</h2>
          {participatedProjects.length === 0 ? (
            <p className="empty-text">You haven't participated in any projects yet.</p>
          ) : (
            <div className="table-container">
              <table className="participated-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Volunteered</th>
                    <th>Amount Donated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participatedProjects.map((proj, idx) => (
                    <tr key={idx}>
                      <td>{proj.ProjectName}</td>
                      <td>{user.projectsVolunteered.includes(proj.ProjectName) ? 'Yes' : 'No'}</td>
                      <td>{user.donation?.[proj.ProjectName] || '₹0'}</td>
                      <td>
                        <button className="view-btn" onClick={() => handleOpenDialog(proj)}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog
  open={openDetailsDialog}
  onClose={() => setOpenDetailsDialog(false)}
  maxWidth="xs"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      padding: 2,
      backgroundColor: '#fef6f9', // pastel pink
      boxShadow: '0px 10px 25px rgba(0,0,0,0.1)',
      maxWidth: '500px',
    }
  }}
>
  <DialogTitle className="dialog-title">
    {selectedProject?.ProjectName}
    {/* <IconButton className="close-btn" onClick={() => setOpenDetailsDialog(false)}>
      <CloseIcon />
    </IconButton> */}
  </DialogTitle>
  <DialogContent className="dialog-content">
    <p><strong>City:</strong> {selectedProject?.City}</p>
    <p><strong>Start Date:</strong> {selectedProject?.StartDate}</p>
    <p><strong>Status:</strong> {selectedProject?.State}</p>
    <p><strong>Description:</strong> {selectedProject?.Description}</p>
  </DialogContent>
</Dialog>


      <Footer />
    </div>
  );
};

export default ParticipatedProjects;
