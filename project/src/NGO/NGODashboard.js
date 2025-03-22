import React, { useState } from 'react';
import '../Main Page/MainDashboard.css';
// import Dialog from '../Main Page/Dialog'
// import { useNavigate } from 'react-router-dom'
// import Carousel from '../Main Page/Carousal'
import Footer from '../Main Page/Footer';
import NGONavbar from './NGONavbar';
import CurrentProjectSlider from './CurrentProjectSlider';
import NewVolunteers from './NewVolunteers';
import VolunteerGraph from './VolunteerGraph';
import ProjectCompletionGraph from './ProjectCompletionGraph';
import './NGODashboard.css'

import 'bootstrap/dist/css/bootstrap.min.css';

function NGODashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

  return (
    <>
    <div class='mainBody'>
      <div className="dashboard-container">
        <NGONavbar toggleSidebar={toggleSidebar} />
      
    <div class='mainWindow'>

          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-item" onClick={toggleSidebar} style={{fontWeight: 700}}>
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

          <div class="currentProjects">
            <h1 class='heading1'>CURRENT PROJECTS</h1>
            <CurrentProjectSlider />
          </div>

          <div class="currentProjects">
            <h1 class='heading1'>MEET OUR NEWEST VOLUNTEERS!</h1>
            <NewVolunteers />
          </div>

          <div class="currentProjects">
            <h1 class='heading1'>VOLUNTEER GROWTH</h1>
            <VolunteerGraph />
          </div>

          <div class="currentProjects">
            <h1 class='heading1'>SUCCESSFULLY COMPLETED PROJECTS</h1>
            <ProjectCompletionGraph />
          </div>

          </div>
      </div>

      <div class="main"></div>
      <Footer />
    </div>
    </>
  )
}

export default NGODashboard