import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "./EnrolledProjects.css";

const EnrolledProjects = () => {
  let uId = parseInt(localStorage.getItem("UniqueIdAtLogin"));

  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    // setUser({
    //   name: "John Doe",
    //   age: 25,
    //   city: "New York",
    //   phone: 9876543210,
    //   gender: "Male",
    //   projectsVolunteered: ["Tree Plantation Drive", "Food Distribution", "Education for All"],
    //   donation: { "Education for All": 50, "Medical Checkup Camp": 100 }
    // });
    axios
      .get(`http://localhost:4000/getSpecificCont?UniqueId=${uId}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching contributor data:", err);
      });
  }, []);

  useEffect(() => {
  if (user.projectsVolunteered && user.projectsVolunteered.length > 0) {
    const fetchProjects = async () => {
      try {
        const projectDetails = await Promise.all(
          user.projectsVolunteered.map((projectName) =>
            axios
              .post("http://localhost:4000/getProjectByName", { ProjectName: projectName })
              .then((res) => {
                console.log("res.data.data",res.data.data)
                
                return res.data.data
              }) // ✅ Get project data directly
              .catch((err) => {
                console.error("Error fetching project:", err);
                return null; // ✅ Return null if error
              })
          )
        );

        setProjects(projectDetails.filter((project) => project !== null));
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };

    fetchProjects();
  }
}, [user]);

  return (
    <div className="projects-container">
      <div className="CurrentProjectsSwiper">
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
          {projects.length > 0 ? (
            projects.map((project, idx) => (
              <SwiperSlide key={idx} className="project-slide">
                <div className="project-card">
                  <h3 className="project-title">{project.ProjectName}</h3>
                  <div className="project-info">
                    <p><FaCalendarAlt className="icon" /> {project.StartDate}</p>
                    <p><FaMapMarkerAlt className="icon" /> {project.City}</p>
                    <p>{project.Description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="no-projects">No enrolled projects found.</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default EnrolledProjects;

