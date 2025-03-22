import React, { useState } from "react";
import "./ProjectList.css";
import { Edit, Delete } from "@mui/icons-material";

const ProjectList = () => {
  // Dummy Projects Data
  const [projects, setProjects] = useState([
    { ProjectName: "Tree Plantation Drive", StartDate: "March 15, 2025", State: "Ongoing", City: "Ahmedabad", Description: "Planting 500+ trees in urban areas." },
    { ProjectName: "Food Distribution", StartDate: "April 5, 2025", State: "Completed", City: "Surat", Description: "Providing free meals to underprivileged families." },
    { ProjectName: "Education for All", StartDate: "May 10, 2025", State: "Ongoing", City: "Vadodara", Description: "Empowering children through free education." },
    { ProjectName: "Blood Donation Camp", StartDate: "June 20, 2025", State: "Completed", City: "Rajkot", Description: "Encouraging blood donations to save lives." },
    { ProjectName: "Clean Water Initiative", StartDate: "July 8, 2025", State: "Ongoing", City: "Bhavnagar", Description: "Providing clean drinking water to rural areas." },
    { ProjectName: "Women Empowerment", StartDate: "Aug 12, 2025", State: "Completed", City: "Gandhinagar", Description: "Skill development for underprivileged women." },
    { ProjectName: "Medical Checkup Camp", StartDate: "Sep 18, 2025", State: "Ongoing", City: "Anand", Description: "Free health checkups for needy individuals." },
    { ProjectName: "Orphanage Support", StartDate: "Oct 22, 2025", State: "Completed", City: "Jamnagar", Description: "Providing educational materials for orphans." },
    { ProjectName: "Disaster Relief Drive", StartDate: "Nov 15, 2025", State: "Ongoing", City: "Bhuj", Description: "Emergency supplies for flood victims." },
    { ProjectName: "Tech for Youth", StartDate: "Dec 5, 2025", State: "Completed", City: "Mehsana", Description: "Teaching coding & digital skills to youth." },
  ]);

  // Edit Project
  const handleEdit = (index) => {
    console.log("Edit clicked for:", projects[index]);
  };

  // Delete Project
  const handleDelete = (index) => {
    console.log("Delete clicked for:", projects[index]);
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="projects-container">
      <h2 className="projects-heading">All NGO Projects</h2>
      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Start Date</th>
              <th>State</th>
              <th>City</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.ProjectName}</td>
                <td>{project.StartDate}</td>
                <td>
                  <span className={project.State === "Ongoing" ? "ongoing-status" : "completed-status"}>
                    {project.State}
                  </span>
                </td>
                <td>{project.City}</td>
                <td>{project.Description}</td>
                <td className="project-actions">
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    <Edit fontSize="small" />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
