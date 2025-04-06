import React from "react";
import "./ProjectDetailsDialog.css";

const ProjectDetailsDialog = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>{project.ProjectName}</h2>
        <p><strong>📅 Start Date:</strong> {project.StartDate}</p>
        <p><strong>📍 Location:</strong> {project.City}</p>
        <p><strong>📜 Description:</strong> {project.Description}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProjectDetailsDialog;
