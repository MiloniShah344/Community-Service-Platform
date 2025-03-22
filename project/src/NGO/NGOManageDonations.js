import React, { useState } from 'react';
import NGONavbar from './NGONavbar';
import DonorList from './DonorsList';
import Footer from '../Main Page/Footer';

function NGOManageDonations() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      }

  return (
    <div className="mainBody">
          <div className="dashboard-container">
            <NGONavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
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
              <div className="projects-container">
                <h2 className="projects-heading">Donors</h2>
                <DonorList />
            </div>
            </div>
          </div>
          <Footer />
          </div>
  )
}

export default NGOManageDonations