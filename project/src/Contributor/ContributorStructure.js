import React, { useState } from 'react';
import ContNavbar from './ContNavbar'
import Footer from '../Main Page/Footer'

export default structure = () =>{

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

    return(
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
          <div className="projects-container">
            <h2 className="projects-heading">All NGO Projects</h2>
        </div>
        </div>
      </div>
      <Footer />
      </div>
    )
}
