import React, { useState, useEffect } from "react";
import "./EditContDialog.css";

const EditContDialog = ({ contributor, onClose, handleSave }) => {
  const [editedCont, setEditedCont] = useState({ ...contributor });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCont((prev) => ({ ...prev, [name]: value }));
  };

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
        <h2>Edit Contributor Profile</h2>

        <label>Name</label>
        <input class = "textinput" type="text" name="name" value={editedCont.name} onChange={handleChange} />

        <label>Age</label>
        <input class = "textinput" type="number" name="age" value={editedCont.age} onChange={handleChange} />

        <label>City</label>
        <input class = "textinput" type="text" name="city" value={editedCont.city} onChange={handleChange} />

        <label>Phone</label>
        <input class = "textinput" type="number" name="phone" value={editedCont.phone} onChange={handleChange} />

        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={editedCont.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={editedCont.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <div className="dialog-buttons">
          <button className="save-btn" onClick={() => handleSave(editedCont)}>
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

export default EditContDialog;
