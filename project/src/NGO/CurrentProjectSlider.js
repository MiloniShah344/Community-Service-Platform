import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import "./CurrentProjectSlider.css";
import axios from 'axios'



//let projects = []
//axios, .then()=>projects.push(res.data)
// store res.data._id in "id" on click of a particular project.

{/* On click of a single project, 
 Pass that project's _id on a variable "id".
 Then, pass that "id" as a parameter in axios.get API */}

// const projects = [
//   {
//     id: 1,
//     ProjectTitle: "Tree Plantation Drive",
//     ProjectDate: "March 15, 2025",
//     ProjectCity: "Ahmedabad",
//     ProjectDescription: "A community initiative to plant 500+ trees across the city.",
//   },
//   {
//     id: 2,
//     ProjectTitle: "Food Distribution",
//     ProjectDate: "April 5, 2025",
//     ProjectCity: "Surat",
//     ProjectDescription: "Providing free meals to 1000+ underprivileged families.",
//   },
//   {
//     id: 3,
//     ProjectTitle: "Education for All",
//     ProjectDate: "May 10, 2025",
//     ProjectCity: "Vadodara",
//     ProjectDescription: "Empowering children through free education and learning kits.",
//   },
//   {
//     id: 4,
//     ProjectTitle: "Blood Donation Camp",
//     ProjectDate: "June 20, 2025",
//     ProjectCity: "Rajkot",
//     ProjectDescription: "Encouraging blood donations to save lives in hospitals.",
//   },
//   {
//     id: 5,
//     ProjectTitle: "Clean Water Initiative",
//     ProjectDate: "July 8, 2025",
//     ProjectCity: "Bhavnagar",
//     ProjectDescription: "Installing water filters in rural areas to provide clean drinking water.",
//   },
//   {
//     id: 6,
//     ProjectTitle: "Women Empowerment Program",
//     ProjectDate: "August 12, 2025",
//     ProjectCity: "Gandhinagar",
//     ProjectDescription: "Skill development workshops for underprivileged women.",
//   },
//   {
//     id: 7,
//     ProjectTitle: "Medical Checkup Camp",
//     ProjectDate: "September 18, 2025",
//     ProjectCity: "Anand",
//     ProjectDescription: "Free health checkups and consultations for needy individuals.",
//   },
//   {
//     id: 8,
//     ProjectTitle: "Orphanage Support Program",
//     ProjectDate: "October 22, 2025",
//     ProjectCity: "Jamnagar",
//     ProjectDescription: "Providing educational materials and emotional support to orphans.",
//   },
//   {
//     id: 9,
//     ProjectTitle: "Disaster Relief Drive",
//     ProjectDate: "November 15, 2025",
//     ProjectCity: "Bhuj",
//     ProjectDescription: "Providing emergency supplies to flood and earthquake-affected areas.",
//   },
//   {
//     id: 10,
//     ProjectTitle: "Tech for Youth",
//     ProjectDate: "December 5, 2025",
//     ProjectCity: "Mehsana",
//     ProjectDescription: "Teaching coding and digital skills to underprivileged youth.",
//   }
// ]

// const completedProjects = [
//   {
//     ProjectTitle: "Winter Blanket Distribution",
//     ProjectDate: "January 10, 2024",
//     ProjectCity: "Ahmedabad",
//     ProjectDescription: "Distributed 500+ blankets to homeless individuals during peak winter.",
//   },
//   {
//     ProjectTitle: "Sanitation Awareness Drive",
//     ProjectDate: "February 25, 2024",
//     ProjectCity: "Surat",
//     ProjectDescription: "Conducted workshops on hygiene and distributed sanitation kits.",
//   },
//   {
//     ProjectTitle: "Free Eye Checkup Camp",
//     ProjectDate: "March 12, 2024",
//     ProjectCity: "Vadodara",
//     ProjectDescription: "Provided free eye checkups and spectacles to 300+ people.",
//   },
//   {
//     ProjectTitle: "Old Age Home Support",
//     ProjectDate: "April 8, 2024",
//     ProjectCity: "Rajkot",
//     ProjectDescription: "Donated daily essentials and spent time with elderly residents.",
//   },
//   {
//     ProjectTitle: "Green City Mission",
//     ProjectDate: "May 22, 2024",
//     ProjectCity: "Bhavnagar",
//     ProjectDescription: "Planted 1000+ trees to promote a greener and cleaner environment.",
//   },
//   {
//     ProjectTitle: "Women Safety Awareness Program",
//     ProjectDate: "June 14, 2024",
//     ProjectCity: "Gandhinagar",
//     ProjectDescription: "Held self-defense training and awareness sessions for women.",
//   },
//   {
//     ProjectTitle: "Skill Development for Youth",
//     ProjectDate: "July 29, 2024",
//     ProjectCity: "Anand",
//     ProjectDescription: "Trained 200+ youth in digital skills and entrepreneurship.",
//   },
//   {
//     ProjectTitle: "Flood Relief Operation",
//     ProjectDate: "August 16, 2024",
//     ProjectCity: "Jamnagar",
//     ProjectDescription: "Supplied food, clothes, and medical aid to flood-affected families.",
//   },
//   {
//     ProjectTitle: "NGO Fundraising Marathon",
//     ProjectDate: "September 10, 2024",
//     ProjectCity: "Bhuj",
//     ProjectDescription: "Organized a marathon to raise funds for underprivileged children’s education.",
//   },
//   {
//     ProjectTitle: "Tech Education for Rural Kids",
//     ProjectDate: "October 30, 2024",
//     ProjectCity: "Mehsana",
//     ProjectDescription: "Provided computers and basic programming lessons to village schools.",
//   },
// ]


const CurrentProjectSlider = () => {

  const [projects, setProjects] = useState([])
  let state = {"State": "Upcoming"}

const handleClick = ()=>{
  console.log("In handleClick")
}

useEffect(() => {
    axios.post(`http://localhost:4000/getSpecificProject`, state)
    .then((res) => {
        console.log("res.data.data in handleClick", res.data.data)
        
        setProjects(res.data.data)
      }).catch((err) => {
        console.log("Error", err)
        
      })
}, [])



  return (
    <>
    <div className="projects-container">
      <div class="CurrentProjectsSwiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="projects-swiper"
      >
       {projects.map((project, idx) => (
          <SwiperSlide key = {idx} className="project-slide" onClick={()=>{handleClick()}}>
            <div className="project-card">
              <h3 className="project-title">{project.ProjectName}</h3>
              <div className="project-info">
                <p><FaCalendarAlt className="icon" /> {project.StartDate}</p>
                <p><FaMapMarkerAlt className="icon" /> {project.City}</p>
                <p> {project.Decription}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* {projects.map((project) => (
          <SwiperSlide key={project.id} className="project-slide">
            <div className="project-card">
              <h3 className="project-title">{project.ProjectTitle}</h3>
              <div className="project-info">
                <p><FaCalendarAlt className="icon" /> {project.ProjectDate}</p>
                <p><FaMapMarkerAlt className="icon" /> {project.ProjectCity}</p>
                <p><FaInfoCircle className="icon" /> {project.ProjectDescription}</p>
              </div>
            </div>
          </SwiperSlide>
        ))} */}
        
      </Swiper>
      </div>
    </div>
    </>
  );
};

export default CurrentProjectSlider;
