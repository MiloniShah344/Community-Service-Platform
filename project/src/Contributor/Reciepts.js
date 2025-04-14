// Reciepts.js
import React, { useEffect, useState } from 'react';
import ContNavbar from './ContNavbar';
import Footer from '../Main Page/Footer';
import './UpcomingProjects.css'; // using existing sidebar styles
import RecieptCard from './RecieptCard';
import axios from 'axios';

const Reciepts = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [receiptList, setReceiptList] = useState([]);

  const uniqueId = localStorage.getItem("UniqueIdAtLogin");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (uniqueId) {
      axios.get(`http://localhost:4000/getSpecificCont?UniqueId=${uniqueId}`)
        .then(res => {
          setUser(res.data.data);
        })
        .catch(err => console.error("Error fetching user:", err));

      axios.post("http://localhost:4000/getSpecificProject", { State: "Upcoming" }) // fetch all projects for description
        .then(res => setProjects(res.data.data))
        .catch(err => console.error("Error fetching projects:", err));
    }
  }, [uniqueId]);

  useEffect(() => {
    if (user && projects.length > 0) {
      const list = Object.entries(user.donation || {}).map(([projectName, amount]) => {
        const project = projects.find(p => p.ProjectName === projectName);
        return {
          projectName,
          amount,
          description: project?.Description || "No description available.",
          date: new Date().toLocaleString(), // You can also store real timestamp in DB
        };
      });
      setReceiptList(list);
    }
  }, [user, projects]);

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
          <h2 className="upcoming-heading">Your Donation Receipts</h2>
          {receiptList.length === 0 ? (
            <p className="empty-text">You have not donated to any project yet.</p>
          ) : (
            receiptList.map((receipt, idx) => (
              <RecieptCard key={idx} receiptData={receipt} contributorName={user.name} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reciepts;
