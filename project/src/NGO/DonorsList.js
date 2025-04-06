import React, { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./DonorsList.css";
import axios from "axios";

const DonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getContributor`)
      .then((res) => {
        const filteredDonors = res.data.data
          .filter(donor => donor.donation && Object.keys(donor.donation).length > 0) // Ensure donation object exists & is not empty
          .map(donor => ({
            ...donor,
            totalAmount: Object.values(donor.donation).reduce((sum, amount) => sum + amount, 0) // Calculate total donation
          }))
          .sort((a, b) => b.totalAmount - a.totalAmount); // Sort by totalAmount in descending order
        
        setDonors(filteredDonors);
      })
      .catch((err) => console.log("Error fetching Donors", err));
  }, []);

  return (
    <div className="donor-container">
      {/* Table-like Header */}
      <div className="donor-header">
        <div className="header-cell" style={{ fontSize: "25px" }}>Name</div>
        <div className="header-cell" style={{ fontSize: "25px" }}>Total Donated</div>
      </div>

      {/* Donors List */}
      <div className="donor-list">
        {donors.map((donor, index) => (
          <Accordion key={index} className="donor-accordion">
            <AccordionSummary expandIcon={<IconButton className="expand-icon"><ExpandMoreIcon /></IconButton>} className="donor-summary">
              <div className="donor-row">
                <div className="donor-cell" style={{ fontFamily: "cursive", fontSize: "20px" }}>{donor.name}</div>
                <div className="donor-cell" style={{ fontFamily: "cursive", fontSize: "20px" }}>₹{donor.totalAmount.toLocaleString()}</div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="donor-details">
              <div className="details-container">
                <div><strong>Age:</strong> {donor.age}</div>
                <div><strong>City:</strong> {donor.city}</div>
                <div><strong>Phone:</strong> {donor.phone}</div>
                <div><strong>Gender:</strong> {donor.gender}</div>
                <div>
                  <strong>Projects Donated To:</strong>
                  <ul>
                    {Object.entries(donor.donation).map(([project, amount], idx) => (
                      <li key={idx}>{project} - ₹{amount.toLocaleString()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default DonorList;
