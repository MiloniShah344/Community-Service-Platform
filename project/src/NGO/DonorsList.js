import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./DonorsList.css";

const donors = [
  { name: "Rajesh Mehta", amount: "₹50,000", age: 45, city: "Ahmedabad", phone: "9876543210", gender: "Male" },
  { name: "Sneha Kapoor", amount: "₹25,000", age: 39, city: "Surat", phone: "9876541230", gender: "Female" },
  { name: "Amit Shah", amount: "₹80,000", age: 50, city: "Vadodara", phone: "9976541230", gender: "Male" },
  { name: "Neha Patel", amount: "₹15,000", age: 32, city: "Rajkot", phone: "9898765432", gender: "Female" },
  { name: "Vikas Tiwari", amount: "₹1,00,000", age: 55, city: "Gandhinagar", phone: "8787654321", gender: "Male" },
  { name: "Ananya Roy", amount: "₹45,000", age: 41, city: "Jamnagar", phone: "9865432190", gender: "Female" },
  { name: "Rohan Khanna", amount: "₹60,000", age: 38, city: "Bhavnagar", phone: "7896543212", gender: "Male" },
  { name: "Priya Iyer", amount: "₹30,000", age: 36, city: "Mumbai", phone: "9823456710", gender: "Female" },
  { name: "Siddharth Malhotra", amount: "₹90,000", age: 47, city: "Pune", phone: "8789456123", gender: "Male" },
  { name: "Kavya Sharma", amount: "₹20,000", age: 29, city: "Bangalore", phone: "9874123650", gender: "Female" }
];

const DonorList = () => {
  return (
    <div className="donor-container">
      {/* Table-like Header */}
      <div className="donor-header">
        <div className="header-cell" style={{fontSize: "25px"}}>Name</div>
        <div className="header-cell" style={{fontSize: "25px"}}>Total Donated</div>
      </div>

      {/* Donors List */}
      <div className="donor-list">
        {donors.map((donor, index) => (
          <Accordion key={index} className="donor-accordion">
            <AccordionSummary expandIcon={<IconButton className="expand-icon"><ExpandMoreIcon /></IconButton>} className="donor-summary">
              <div className="donor-row">
                <div className="donor-cell" style={{fontFamily: "cursive", fontSize: "20px"}}>{donor.name}</div>
                <div className="donor-cell" style={{fontFamily: "cursive", fontSize: "20px"}}>{donor.amount}</div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="donor-details">
              <div className="details-container">
                <div><strong>Age:</strong> {donor.age}</div>
                <div><strong>City:</strong> {donor.city}</div>
                <div><strong>Phone:</strong> {donor.phone}</div>
                <div><strong>Gender:</strong> {donor.gender}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default DonorList;
