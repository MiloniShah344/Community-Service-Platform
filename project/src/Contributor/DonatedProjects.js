import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "./DonatedProjects.css";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DonatedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setUser({
      name: "John Doe",
      age: 25,
      city: "New York",
      phone: 9876543210,
      gender: "Male",
      projectsVolunteered: ["Tree Plantation Drive", "Food Distribution", "Education for All"],
      donation: { "Education for All": 5000, "Medical Checkup Camp": 10000 },
    });
  }, []);

  useEffect(() => {
    if (user.donation) {
      const fetchProjects = async () => {
        try {
          const projectDetails = await Promise.all(
            Object.keys(user.donation).map((projectName) =>
              axios
                .post("http://localhost:4000/getProjectByName", { ProjectName: projectName })
                .then((res) => res.data.data)
                .catch((err) => {
                  console.error("Error fetching project:", err);
                  return null;
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

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  return (
    <>
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
                <SwiperSlide key={idx} className="project-slide" onClick={() => handleCardClick(project)}>
                  <div className="project-card">
                    <h3 className="project-title">{project.ProjectName}</h3>
                    <div className="project-info">
                      <p><FaCalendarAlt className="icon" /> {project.StartDate}</p>
                      <p><FaMapMarkerAlt className="icon" /> {project.City}</p>
                      <p className="donation-amount">
                        <FaRupeeSign className="icon" /> {user.donation[project.ProjectName]}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="no-projects">No donations made yet.</p>
            )}
          </Swiper>
        </div>
      </div>

      {/* Dialog for project details */}
      {projects.length > 0 ? (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedProject?.ProjectName}
          <IconButton aria-label="close" onClick={() => setOpenDialog(false)} style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p><FaCalendarAlt className="icon" /> {selectedProject?.StartDate}</p>
          <p><FaMapMarkerAlt className="icon" /> {selectedProject?.City}</p>
          <p>{selectedProject?.Description}</p>
          <p className="donation-amount"><FaRupeeSign className="icon" /> {user.donation[selectedProject?.ProjectName]}</p>
        </DialogContent>
      </Dialog>
      ) : (
              <p></p>
      )}
    </>
  );
};

export default DonatedProjects;
