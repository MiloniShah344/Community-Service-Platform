import React, { useState, useEffect } from "react";
import "./TotalDonation.css";
import { FaRupeeSign } from "react-icons/fa";

const TotalDonation = ({ donationData }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (donationData) {
      const total = Object.values(donationData).reduce((sum, amount) => sum + amount, 0);
      setTotalAmount(total);
    }
  }, [donationData]);

  return (
    <div className="donation-container">
      <h2 className="donation-title"> Total Donations </h2>
      <div className="donation-card">
        <h3 className="donation-amount">
          <FaRupeeSign className="rupee-icon" /> {totalAmount.toLocaleString()} /-
        </h3>
        <p className="donation-subtext">Your kindness is changing lives! ❤️</p>
      </div>

      <div className="top-donations">
        <h4 style={{fontWeight: 700}}> Top Donated Projects </h4>
        <ul>
          {Object.entries(donationData).map(([project, amount], idx) => (
            <li key={idx} className="donation-item">
              <span className="project-name">{project}</span>
              <span className="donation-amount"><FaRupeeSign /> {amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TotalDonation;
