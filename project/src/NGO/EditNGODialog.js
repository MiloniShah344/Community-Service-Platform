import React, { useState, useEffect } from "react";
import "./EditNGODialog.css";

const EditNGODialog = ({ ngo, onClose, handleSave }) => {
  const [editedNGO, setEditedNGO] = useState({ ...ngo });

  // Handle input change
  const handleChange = (e) => {
    setEditedNGO((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Close dialog when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!document.querySelector(".dialog-box")?.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>Edit NGO Profile</h2>

        <label>NGO Name</label>
        <input type="text" name="NGOName" value={editedNGO.NGOName} onChange={handleChange} />

        <label>Year of Establishment</label>
        <input type="text" name="YearOfEstablishment" value={editedNGO.YearOfEstablishment} onChange={handleChange} />

        <label>City</label>
        <input type="text" name="City" value={editedNGO.City} onChange={handleChange} />

        <label>Contact</label>
        <input type="text" name="Contact" value={editedNGO.Contact} onChange={handleChange} />

        <div className="dialog-buttons">
          <button className="save-btn" onClick={() => handleSave(editedNGO)}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNGODialog;
