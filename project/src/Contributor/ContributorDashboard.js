import React, { useState } from 'react';
import '../Main Page/MainDashboard.css';
import Footer from '../Main Page/Footer';
import ContNavbar from './ContNavbar';
import ContCarousal from './ContCarousal';
import './ContributorDashboard.css'
import EnrolledProjects from './EnrolledProjects'

import 'bootstrap/dist/css/bootstrap.min.css';
import DonatedProjects from './DonatedProjects';
import TotalDonation from './TotalDonation';

function NGODashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

  return (
    <>
    <div class='mainBody'>
      <div className="dashboard-container">
        <ContNavbar toggleSidebar={toggleSidebar} />
      
    <div class='mainWindow'>

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

          <div className="main-content">
              <ContCarousal />
          </div>

          <div class="currentProjects">
            
            <h1 class='heading1'>🌍 Be the Change. Make an Impact. 🤝</h1>
            <p>
              Every moment you give, every skill you share, and every action you take has the power to transform lives. Volunteering isn’t just about helping others—it’s about being part of something bigger, something truly meaningful. 💙 It’s a chance to inspire hope, bring smiles, and create lasting change in communities that need you.  
            </p>
            <p>
              Whether it’s lending a helping hand at an event, supporting a cause close to your heart, or using your expertise to make a difference, your contribution matters. 🙌 The world needs more kindness, and it starts with YOU! 💡✨  
            </p>
            <p>
              Join hands with passionate individuals, experience the joy of giving, and be a part of a movement that changes lives—one act of kindness at a time. <b>Sign up today and start making an impact!</b>🚀💖
            </p>
            
          </div>

          <div class="currentProjects">
            <h1 class='heading1'>ENROLLED PROJECTS</h1>
            <EnrolledProjects />
          </div>

          <div class="currentProjects">
            <h1 class='heading1'>💖 Give Hope. Change Lives. 🙌</h1>
            <p>
              A small act of kindness can create a ripple of change! 🌊 Your donation isn’t just money—it's food for the hungry, education for a child, shelter for the homeless, and hope for those in need. 💡✨ Every contribution, big or small, makes a real difference in someone's life.  
            </p>
            <p>
              When you give, you're not just donating—you're <b>empowering dreams, spreading kindness, and building a better tomorrow.</b> 🌍💙 Imagine the impact if we all came together to support a cause that truly matters!
            </p>
            <p>
              Be the reason someone smiles today. 😊 <b>Donate now and turn compassion into action! </b> 🤝💫
            </p>
          </div>

          <div class="currentProjects">
            <h1 class='heading1'>Projects You Contributed To</h1>
            <DonatedProjects />
          </div>

          <div class="currentProjects">
            <h1 class='heading1'></h1>
            <TotalDonation donationData={{ "Education for All": 5000, "Medical Checkup Camp": 10000 }} />
          </div>

          <div class="currentProjects">
            {/* <h1 class='heading1'>SUCCESSFULLY COMPLETED PROJECTS</h1> */}
            {/* <ProjectCompletionGraph /> */}
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