import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./VolunteerList.css";

const volunteers = [
  { name: "Rahul Sharma", projects: ["Tree Plantation", "Food Drive"], age: 28, city: "Ahmedabad", phone: "9876543210", gender: "Male" },
  { name: "Priya Desai", projects: ["Education Support", "Medical Aid"], age: 32, city: "Surat", phone: "9876541230", gender: "Female" },
  { name: "Amit Patel", projects: ["Blood Donation", "Disaster Relief"], age: 26, city: "Vadodara", phone: "9976541230", gender: "Male" },
  { name: "Sneha Mehta", projects: ["Women Empowerment", "Child Education"], age: 30, city: "Rajkot", phone: "9898765432", gender: "Female" },
  { name: "Vikram Singh", projects: ["Elderly Care", "Medical Camps"], age: 35, city: "Gandhinagar", phone: "8787654321", gender: "Male" },
  { name: "Neha Joshi", projects: ["Animal Welfare", "Tree Plantation"], age: 27, city: "Jamnagar", phone: "9865432190", gender: "Female" },
  { name: "Rohan Verma", projects: ["Disaster Relief", "Blood Donation"], age: 29, city: "Bhavnagar", phone: "7896543212", gender: "Male" },
  { name: "Ananya Kapoor", projects: ["Food Drive", "Child Education"], age: 31, city: "Mumbai", phone: "9823456710", gender: "Female" },
  { name: "Siddharth Malhotra", projects: ["Medical Aid", "Elderly Care"], age: 33, city: "Pune", phone: "8789456123", gender: "Male" },
  { name: "Kavya Iyer", projects: ["Women Empowerment", "Tree Plantation"], age: 25, city: "Bangalore", phone: "9874123650", gender: "Female" }
];

const VolunteerList = () => {
  return (
    <div className="volunteer-container">

      {/* Table-like Header */}
      <div className="volunteer-header">
        <div className="header-cell" style={{fontSize: "25px"}}>Name</div>
        <div className="header-cell" style={{fontSize: "25px"}}>Projects Contributed To</div>
        {/* <div className="header-cell"></div> */}
      </div>

      {/* Volunteers List */}
      <div className="volunteer-list">
        {volunteers.map((volunteer, index) => (
          <Accordion key={index} className="volunteer-accordion">
            <AccordionSummary expandIcon={<IconButton className="expand-icon"><ExpandMoreIcon /></IconButton>} className="volunteer-summary">
              <div className="volunteer-row">
                <div className="volunteer-cell" style={{fontFamily: "cursive", fontSize: "20px"}}>{volunteer.name}</div>
                <div className="volunteer-cell" style={{fontFamily: "cursive", fontSize: "20px"}}>{volunteer.projects.join(", ")}</div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="volunteer-details">
              <div className="details-container">
                <div><strong>Age:</strong> {volunteer.age}</div>
                <div><strong>City:</strong> {volunteer.city}</div>
                <div><strong>Phone:</strong> {volunteer.phone}</div>
                <div><strong>Gender:</strong> {volunteer.gender}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default VolunteerList;
