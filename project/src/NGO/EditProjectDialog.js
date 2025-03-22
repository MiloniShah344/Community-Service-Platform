import React, { useState, useEffect } from "react";
import "./EditProjectDialog.css";

const EditProjectDialog = ({ project, onSave, onClose }) => {
  const [editedProject, setEditedProject] = useState(project);

  const handleChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  // Close modal when clicking outside the box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("dialog-overlay")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>Edit Project</h2>
        <label>Project Name</label>
        <input type="text" name="ProjectName" value={editedProject.ProjectName} onChange={handleChange} />

        <label>Start Date</label>
        <input type="date" name="StartDate" value={editedProject.StartDate} onChange={handleChange} />

        <label>Status</label>
        <select name="State" value={editedProject.State} onChange={handleChange}>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <label>City</label>
        <input type="text" name="City" value={editedProject.City} onChange={handleChange} />

        <label>Description</label>
        <textarea name="Description" value={editedProject.Description} onChange={handleChange}></textarea>

        <div className="dialog-buttons">
          <button className="save-btn" onClick={() => onSave(editedProject)}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectDialog;
