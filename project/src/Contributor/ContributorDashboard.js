// ContributorDashboard.js
import React, { useState, useEffect } from 'react';
import '../Main Page/MainDashboard.css';
import Footer from '../Main Page/Footer';
import ContNavbar from './ContNavbar';
import ContCarousal from './ContCarousal';
import './ContributorDashboard.css';
import EnrolledProjects from './EnrolledProjects';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Typography, Box, Card, CardContent, Button } from '@mui/material';

import 'bootstrap/dist/css/bootstrap.min.css';
import DonatedProjects from './DonatedProjects';
import TotalDonation from './TotalDonation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContributorDashboard() {
  const uId = parseInt(localStorage.getItem("UniqueIdAtLogin"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [update, doupdate] = useState(false)
    const [contributor, setContributor] = useState({});
    const [donationData, setDonationData] = useState({})

  const navigate = useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
      axios
        .get(`http://localhost:4000/getSpecificCont?UniqueId=${uId}`)
        .then((res) => {
          setContributor(res.data.data);
          console.log("contributor in useEffect", res.data.data)
          setDonationData(res.data.data.donation)
        })

        .catch((err) => {
          console.error("Error fetching contributor data:", err);
        });
    }, []);

  return (
    <>
      <div className="mainBody">
        <div className="dashboard-container">
          <ContNavbar toggleSidebar={toggleSidebar} />

          <div className="mainWindow">
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
              <div className="sidebar-item" onClick={toggleSidebar} style={{ fontWeight: 700 }}>
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

            <div className="main-contentx">
              <ContCarousal />
            </div>
            <div class = "contributor-content">
            <div className="currentProjects">
              <h1 className="heading1">🌍 Be the Change. Make an Impact. 🤝</h1>
              <p>
                Every moment you give, every skill you share, and every action you take has the power to transform lives.
                Volunteering isn’t just about helping others—it’s about being part of something bigger, something truly meaningful. 💙
                It’s a chance to inspire hope, bring smiles, and create lasting change in communities that need you.
              </p>
              <p>
                Whether it's lending a helping hand at an event, supporting a cause close to your heart, or using your expertise
                to make a difference, your contribution matters. 🙌 The world needs more kindness, and it starts with YOU! 💡✨
              </p>
              <p>
                Join hands with passionate individuals, experience the joy of giving, and be a part of a movement that changes lives—
                one act of kindness at a time. <b>Sign up today and start making an impact!</b> 🚀💖
              </p>
            </div>

            <div className="currentProjects">
              <h1 className="heading1">ENROLLED PROJECTS</h1>
              <EnrolledProjects />
            </div>

            <div className="currentProjects">
              <h1 className="heading1">💖 Give Hope. Change Lives. 🙌</h1>
              <p>
                A small act of kindness can create a ripple of change! 🌊 Your donation isn’t just money—it's food for the hungry,
                education for a child, shelter for the homeless, and hope for those in need. 💡✨ Every contribution, big or small,
                makes a real difference in someone's life.
              </p>
              <p>
                When you give, you're not just donating—you're <b>empowering dreams, spreading kindness, and building a better tomorrow.</b> 🌍💙
                Imagine the impact if we all came together to support a cause that truly matters!
              </p>
              <p>
                Be the reason someone smiles today. 😊 <b>Donate now and turn compassion into action! </b> 🤝💫
              </p>
            </div>

            <div className="currentProjects">
              <h1 className="heading1">Projects You Contributed To</h1>
              <DonatedProjects />
            </div>

            <div className="currentProjects">
              <h1 className="heading1"></h1>
              <TotalDonation donationData={donationData} />
            </div>

            <div className="currentProjects">
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #d1f2eb, #fef9e7)',
                  borderRadius: 4,
                  boxShadow: 3,
                  mb: 4,
                  width: '90%',
                  maxWidth: '1000px',
                }}
              >
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 700 }}>
                    Join Us to Make a Difference
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: '#333' }}>
                    Explore upcoming projects, contribute to causes you care about, and inspire change in your community.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: '20px',
                      textTransform: 'none',
                      backgroundColor: '#4db6ac',
                      '&:hover': {
                        backgroundColor: '#00796b',
                        color: '#fff',
                      },
                    }}
                    startIcon={<VolunteerActivismIcon />}
                    onClick={()=>{navigate('/upcomingProjects')}}
                  >
                    View Opportunities
                  </Button>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </div>

        <div className="main"></div>
        <Footer />
      </div>
    </>
  );
}

export default ContributorDashboard;
