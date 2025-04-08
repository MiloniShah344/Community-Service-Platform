import React, { useState, useEffect } from 'react';
import ContNavbar from './ContNavbar';
import Footer from '../Main Page/Footer';
import axios from 'axios';
import './UpcomingProjects.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UpcomingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openVolunteerDialog, setOpenVolunteerDialog] = useState(false);
  const [openDonationConfirmDialog, setOpenDonationConfirmDialog] = useState(false);
  const [openDonationDialog, setOpenDonationDialog] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const uniqueId = localStorage.getItem("UniqueIdAtLogin");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch upcoming projects
  useEffect(() => {
    axios
      .post(`http://localhost:4000/getSpecificProject`, { State: "Upcoming" })
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.log("Error fetching upcoming projects:", err));
  }, []);

  // Fetch user
  useEffect(() => {
    if (uniqueId) {
      axios
        .get(`http://localhost:4000/getSpecificContributor?UniqueId=${uniqueId}`)
        .then((res) => setUser(res.data.data))
        .catch((err) => console.error("Error fetching contributor:", err));
    }
  }, [uniqueId]);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDetailsDialog(true);
  };

  const handleVolunteer = () => {
    if (!user || !selectedProject) return;
    const updatedProjects = [...user.projectsVolunteered, selectedProject.ProjectName];

    axios
      .post(`http://localhost:4000/updateCont?_id=${user._id}`, {
        projectsVolunteered: updatedProjects,
      })
      .then((res) => {
        console.log("Volunteered successfully:", res);
        setOpenVolunteerDialog(false);
        setOpenDetailsDialog(false);
      })
      .catch((err) => console.error("Error volunteering:", err));
  };

  const handleDonation = () => {
    if (!user || !selectedProject || !donationAmount) return;
    const updatedDonations = {
      ...user.donation,
      [selectedProject.ProjectName]: donationAmount,
    };

    axios
      .post(`http://localhost:4000/updateCont?_id=${user._id}`, {
        donation: updatedDonations,
      })
      .then((res) => {
        console.log("Donated:", donationAmount);
        setDonationAmount('');
        setOpenDonationDialog(false);
        setOpenDetailsDialog(false);
      })
      .catch((err) => console.error("Donation error:", err));
  };

  return (
    <div className="mainBody">
      <div className="dashboard-container">
        <ContNavbar toggleSidebar={toggleSidebar} />
        <div className="mainWindow upcoming-container">
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
          <h2 className="upcoming-heading">Upcoming Projects</h2>
          {projects.length === 0 ? (
            <p className="empty-text">No upcoming projects right now.</p>
          ) : (
            <div className="table-container">
              <table className="upcoming-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj, idx) => (
                    <tr key={idx}>
                      <td>{proj.ProjectName}</td>
                      <td>{proj.StartDate}</td>
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

      {/* Project Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="dialog-title">
          {selectedProject?.ProjectName}
          <IconButton className="close-btn" onClick={() => setOpenDetailsDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <p><strong>City:</strong> {selectedProject?.City}</p>
          <p><strong>Start Date:</strong> {selectedProject?.StartDate}</p>
          <p><strong>Status:</strong> {selectedProject?.State}</p>
          <p><strong>Description:</strong> {selectedProject?.Description}</p>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpenVolunteerDialog(true)} className="volunteer-btn">Volunteer</Button>
          <Button onClick={() => setOpenDonationConfirmDialog(true)} className="donate-btn">Donate</Button>
        </DialogActions>
      </Dialog>

      {/* Volunteer Confirm Dialog */}
      <Dialog open={openVolunteerDialog} onClose={() => setOpenVolunteerDialog(false)}>
        <DialogTitle>Confirm Volunteering</DialogTitle>
        <DialogContent>
          Are you sure you want to volunteer in <b>{selectedProject?.ProjectName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVolunteerDialog(false)}>Cancel</Button>
          <Button onClick={handleVolunteer} className="volunteer-btn">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Donation Confirmation Dialog */}
      <Dialog open={openDonationConfirmDialog} onClose={() => setOpenDonationConfirmDialog(false)}>
        <DialogTitle>Confirm Donation</DialogTitle>
        <DialogContent>
          Would you like to donate to <b>{selectedProject?.ProjectName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDonationConfirmDialog(false)}>Cancel</Button>
          <Button onClick={() => {
            setOpenDonationConfirmDialog(false);
            setOpenDonationDialog(true);
          }} className="donate-btn">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Donation Amount Dialog */}
      <Dialog open={openDonationDialog} onClose={() => setOpenDonationDialog(false)}>
        <DialogTitle>Enter Donation Amount</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDonationDialog(false)}>Cancel</Button>
          <Button onClick={handleDonation} className="donate-btn">Donate Now</Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </div>
  );
};

export default UpcomingProjects;
