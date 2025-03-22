import React, { useState } from 'react';
import NGONavbar from './NGONavbar';
import Carousal from './NGOCarousal';
// import './NGODashboard1.css';

const dummyNGOs = [
    { id: 1, name: "Helping Hands", projects: 12, volunteers: 45, donations: "$50K" },
    { id: 2, name: "Save Earth", projects: 8, volunteers: 30, donations: "$35K" },
    { id: 3, name: "Food for All", projects: 15, volunteers: 50, donations: "$60K" }
];

const NGODashboard1 = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div>
            <NGONavbar toggleSidebar={toggleSidebar} />
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-item"><a href="/profile">Profile</a></div>
                <div className="sidebar-item"><a href="/post-project">Post New Project</a></div>
                <div className="sidebar-item"><a href="/manage-projects">Manage Projects</a></div>
                <div className="sidebar-item"><a href="/manage-volunteers">Manage Volunteers</a></div>
                <div className="sidebar-item"><a href="/manage-donations">Manage Donations</a></div>
            </div>
            <div className="main-content">
                <Carousal />
                <div className="ngo-list">
                    {dummyNGOs.map(ngo => (
                        <div key={ngo.id} className="ngo-card">
                            <h3>{ngo.name}</h3>
                            <p><strong>Projects:</strong> {ngo.projects}</p>
                            <p><strong>Volunteers:</strong> {ngo.volunteers}</p>
                            <p><strong>Donations:</strong> {ngo.donations}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default NGODashboard1