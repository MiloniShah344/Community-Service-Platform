import React, {useState} from 'react'
import NGONavbar from "./NGONavbar";
import Footer from "../Main Page/Footer";
import PostProject from './PostProject';
import './PostProject.css'

function NGOPostProject() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
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
            <PostProject />
          </div>
          </div>
          
          </div>
          <Footer />
          </div>
  )
}

export default NGOPostProject