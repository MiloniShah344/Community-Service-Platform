import React from "react";
import "./NewVolunteers.css";

const volunteers = [
  {
    name: "Aarav Mehta",
    joinDate: "January 10, 2024",
    city: "Mumbai",
    description:
      "I joined this NGO to contribute to education initiatives. It has been a life-changing experience helping underprivileged kids achieve their dreams.",
  },
  {
    name: "Sanya Kapoor",
    joinDate: "March 5, 2024",
    city: "Delhi",
    description:
      "Being part of this NGO has taught me the real meaning of community service. Every event is filled with warmth and positive energy!",
  },
  {
    name: "Rohan Patel",
    joinDate: "February 20, 2024",
    city: "Ahmedabad",
    description:
      "I love the transparency and impact of this organization. The projects here truly change lives, and I'm honored to be a part of it.",
  },
  {
    name: "Meera Sharma",
    joinDate: "April 15, 2024",
    city: "Bangalore",
    description:
      "Giving back to society has always been my goal. The NGO's initiatives in health and education have been inspiring to work on.",
  },
  {
    name: "Kartik Verma",
    joinDate: "May 2, 2024",
    city: "Kolkata",
    description:
      "I was looking for a meaningful way to help, and this NGO gave me the perfect opportunity. The impact we create is truly fulfilling.",
  },
  {
    name: "Priya Menon",
    joinDate: "June 18, 2024",
    city: "Chennai",
    description:
      "This organization helped me grow as an individual. Volunteering here has strengthened my empathy and leadership skills.",
  },
];

const NewVolunteers = () => {
  return (
    <div className="volunteers-container">
      {/* <h2 className="volunteers-title"></h2> */}
      <div className="volunteers-list">
        {volunteers.map((volunteer, index) => (
          <div key={index} className="volunteer-card">
            <h3 className="volunteer-name">{volunteer.name}</h3>
            <p className="volunteer-details">
              📅 Joined: <span>{volunteer.joinDate}</span>
            </p>
            <p className="volunteer-details">
              📍 City: <span>{volunteer.city}</span>
            </p>
            <p className="volunteer-description">“{volunteer.description}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewVolunteers;
