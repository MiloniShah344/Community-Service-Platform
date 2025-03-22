import React from "react";
import { useNavigate } from "react-router-dom";
import "./WhyChooseUs.css"; // Import external CSS

const WhyChooseUs = () => {
  const navigate = useNavigate();

  return (
    <div className="why-choose-container">

      <p className="why-choose-description">
        We believe in creating a seamless platform where <strong>NGOs, volunteers, and donors</strong>  
        can collaborate effectively to drive social impact. Here's why <strong>Connecting Goodness</strong>  
        is the right choice for making a difference!
      </p>

      <div className="why-choose-grid">
        {/* Global Impact */}
        <div className="why-choose-card">
          <h3 className="card-title">🌍 Global Impact</h3>
          <p className="card-description">
            We connect people across the world to create real, measurable change  
            in local and global communities.
          </p>
        </div>

        {/* Collaboration Between NGOs & Contributors */}
        <div className="why-choose-card">
          <h3 className="card-title">🤝 NGO & Contributor Collaboration</h3>
          <p className="card-description">
            NGOs can post projects and manage volunteers, while contributors  
            can donate time, skills, or funds with ease.
          </p>
        </div>

        {/* Transparency & Trust */}
        <div className="why-choose-card">
          <h3 className="card-title">🔍 Transparency & Trust</h3>
          <p className="card-description">
            Every donation, volunteer activity, and project update is tracked  
            to ensure full accountability and trust.
          </p>
        </div>

        {/* Real-World Impact */}
        <div className="why-choose-card">
          <h3 className="card-title">🌱 Real-World Impact</h3>
          <p className="card-description">
            From education and healthcare to environmental sustainability,  
            every action leads to a lasting impact in communities.
          </p>
        </div>

        {/* Awareness & Outreach */}
        <div className="why-choose-card">
          <h3 className="card-title">📢 Awareness & Outreach</h3>
          <p className="card-description">
            We empower NGOs by helping them reach a wider audience,  
            increasing support and engagement for their causes.
          </p>
        </div>

        {/* Quick & Easy Onboarding */}
        <div className="why-choose-card">
          <h3 className="card-title">⚡ Quick & Easy Onboarding</h3>
          <p className="card-description">
            A hassle-free registration process ensures NGOs, volunteers,  
            and donors can start making an impact immediately.
          </p>
        </div>
      </div>

      <div className="why-choose-button-container">
        <button
          onClick={() => navigate("./Login")}
          className="why-choose-button"
        >
          Join Us & Make a Difference!
        </button>
      </div>
    </div>
  );
};

export default WhyChooseUs;
