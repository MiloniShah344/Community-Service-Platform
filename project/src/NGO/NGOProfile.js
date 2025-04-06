import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import NGONavbar from "./NGONavbar";
import Footer from "../Main Page/Footer";
import EditNGODialog from "./EditNGODialog";
import "./NGOProfile.css";
import axios from "axios";

const NGOProfile = () => {
  let uId = parseInt(localStorage.getItem("UniqueIdAtLogin"));

  const [ngo, setNgo] = useState({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [update, setUpdate] = useState(false); // Used to trigger useEffect

  useEffect(() => {
    console.log("Fetching NGO data for uId:", uId);
    axios
      .get(`http://localhost:4000/getSpecificNGO?UniqueId=${uId}`)
      .then((res) => {
        console.log("Fetched NGO data:", res.data);
        setNgo(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching NGO data:", err);
      });
  }, [update])

  // Open Edit Dialog
  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  // Close Edit Dialog
  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  // Save changes and refresh NGO data
  const handleSave = (editedNGO) => {
    console.log("Saving updated NGO:", editedNGO);

    axios
      .put(`http://localhost:4000/updateNGO?_id=${ngo._id}`, editedNGO)
      .then((res) => {
        console.log("Update response:", res.data);
        setUpdate((prev) => !prev); // Trigger useEffect to refetch data
        setIsEditDialogOpen(false);
      })
      .catch((err) => {
        console.error("Error updating NGO:", err);
      });
  };

  return (
    <div className="mainBody">
      <div className="dashboard-container">
        <NGONavbar />
        <div className="mainWindow">
          <div className="ngo-profile-container">
            {ngo ? (
              <>
                {/* Banner */}
                <div className="ngo-banner">
                  <h1 style={{ fontFamily: "serif", fontWeight: 500, fontSize: "50px" }}>
                    {ngo.NGOName}
                  </h1>
                </div>

                {/* NGO Details */}
                <div className="ngo-details">
                  <div className="detail">
                    <strong>Year of Establishment</strong>
                    <h3>{ngo.YearOfEstablishment}</h3>
                  </div>
                  <div className="detail">
                    <strong>City</strong>
                    <h3>{ngo.City}</h3>
                  </div>
                  <div className="detail">
                    <strong>Contact</strong>
                    <h3>{ngo.Contact}</h3>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="ngo-actions">
                  <Button className="edit-btn" onClick={handleEdit} startIcon={<Edit />}>
                    Edit
                  </Button>
                </div>
              </>
            ) : (
              <h2 className="no-ngo-text">No NGO Data Available</h2>
            )}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <EditNGODialog ngo={ngo} onClose={handleCloseDialog} handleSave={handleSave} />
      )}

      <Footer />
    </div>
  );
};

export default NGOProfile;
