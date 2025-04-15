// All your existing imports
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
  Snackbar,
  Alert,
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const uniqueId = localStorage.getItem("UniqueIdAtLogin");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios
      .post(`http://localhost:4000/getSpecificProject`, { State: "Upcoming" })
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.log("Error fetching upcoming projects:", err));
  }, []);

  useEffect(() => {
    if (uniqueId) {
      axios
        .get(`http://localhost:4000/getSpecificCont?UniqueId=${uniqueId}`)
        .then((res) => {
          console.log("res.data.data in getSpecificCont", res.data.data)
          setUser(res.data.data)
        })
        .catch((err) => console.error("Error fetching contributor:", err));
    }
  }, [uniqueId]);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDetailsDialog(true);
  };

  const handleVolunteer = () => {
    if (!user || !selectedProject) return;

    const isAlreadyVolunteered = user.projectsVolunteered.includes(selectedProject.ProjectName);
    if (isAlreadyVolunteered) {
      setSnackbar({ open: true, message: "Already volunteered for this project!", severity: "info" });
    } else {
      const updatedUser = {
        ...user,
        projectsVolunteered: [...user.projectsVolunteered, selectedProject.ProjectName],
      };

      axios
        .put(`http://localhost:4000/updateCont?_id=${user._id}`, updatedUser)
        .then((res) => {
          console.log("updatedUser", updatedUser)
          setUser(updatedUser); // update local user state
          setSnackbar({ open: true, message: "Volunteered successfully!", severity: "success" });
        })
        .catch((err) => {
          console.error("Error volunteering:", err);
          setSnackbar({ open: true, message: "Failed to volunteer!", severity: "error" });
        });
    }

    setOpenVolunteerDialog(false);
    setOpenDetailsDialog(false);
  };

  const handleDonation = () => {
    if (!user || !selectedProject || !donationAmount) return;

    const updatedDonations = {
      ...user.donation,
      [selectedProject.ProjectName]: donationAmount,
    };

    const updatedUser = {
      ...user,
      donation: updatedDonations,
    };

    axios
      .put(`http://localhost:4000/updateCont?_id=${user._id}`, updatedUser)
      .then((res) => {
        // Save Receipt
        const receiptData = {
          userId: user.UniqueId,
          projectName: selectedProject.ProjectName,
          amount: Number(donationAmount),
          city: selectedProject.City,
          startDate: selectedProject.StartDate,
          status: selectedProject.State,
          description: selectedProject.Description
        };

        axios.post("http://localhost:4000/saveReceipt", receiptData);

        setUser(updatedUser);
        setDonationAmount('');
        setSnackbar({ open: true, message: "Donation successful!", severity: "success" });
      })
      .catch((err) => {
        console.error("Donation error:", err);
        setSnackbar({ open: true, message: "Failed to donate!", severity: "error" });
      });

    setOpenDonationDialog(false);
    setOpenDetailsDialog(false);
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
      <Dialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
            background: '#fafafa',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            padding: '20px',
          },
        }}
      >
        <DialogTitle style={{ color: '#374785', fontSize: '22px', fontWeight: 'bold', float: 'left' }}>
          {selectedProject?.ProjectName}
          {/* <IconButton onClick={() => setOpenDetailsDialog(false)} style={{ float: 'right' }}>
      <CloseIcon />
    </IconButton> */}
        </DialogTitle>
        <DialogContent dividers style={{ fontSize: '15px' }}>
          <p><strong>City:</strong> {selectedProject?.City}</p>
          <p><strong>Start Date:</strong> {selectedProject?.StartDate}</p>
          <p><strong>Status:</strong> {selectedProject?.State}</p>
          <p><strong>Description:</strong> {selectedProject?.Description}</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDetailsDialog(false);
              setTimeout(() => setOpenVolunteerDialog(true), 300);
            }}
            style={{
              backgroundColor: '#6a8caf',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 18px',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3b5b76'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6a8caf'}
          >
            Volunteer
          </Button>
          <Button
            onClick={() => {
              setOpenDetailsDialog(false);
              setTimeout(() => setOpenDonationConfirmDialog(true), 300)

            }}
            style={{
              backgroundColor: '#b27ba6',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 18px',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8e5d85'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b27ba6'}
          >
            Donate
          </Button>
        </DialogActions>
      </Dialog>


      {/* Volunteer Confirm Dialog */}
      <Dialog
        open={openVolunteerDialog}
        onClose={() => setOpenVolunteerDialog(false)}
        PaperProps={{
          style: {
            borderRadius: '16px',
            background: '#fffaf5',
            padding: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <DialogTitle style={{ color: '#374785', fontWeight: '600' }}>
          Confirm Volunteering
        </DialogTitle>
        <DialogContent>
          Are you sure you want to volunteer for <b>{selectedProject?.ProjectName}</b>?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenVolunteerDialog(false)}
            style={{
              backgroundColor: '#aaa',
              color: 'white',
              borderRadius: '6px',
              padding: '6px 16px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVolunteer}
            style={{
              backgroundColor: '#6a8caf',
              color: 'white',
              borderRadius: '6px',
              padding: '6px 16px',
              fontWeight: 'bold',
            }}
          >
            Yes
          </Button>
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
          <Button onClick={handleDonation} className="donate-btn" disabled={!donationAmount || Number(donationAmount) <= 0}>Donate Now</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default UpcomingProjects;
