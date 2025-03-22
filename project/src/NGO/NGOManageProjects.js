import React, { useState, useEffect } from "react";
import axios from "axios";
import NGONavbar from "./NGONavbar";
import Footer from "../Main Page/Footer";
import { Edit, Delete } from "@mui/icons-material";
import EditProjectDialog from "./EditProjectDialog"; // Import the proper dialog component
import "./ProjectList.css";

const NGOManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [update, doupdate] = useState(false)

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getAllProjects`)
      .then((res) => {
        console.log("Fetched Projects:", res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => console.log("Error fetching projects", err));
  }, [update]);

  // Handle Edit Button Click
  const handleEdit = (index) => {
    setSelectedProject({ ...projects[index], index });
    console.log("index",index)
    console.log("projects[index]",projects[index])
    setCurrentProject(projects[index])
    doupdate(!update)
  };

  // Handle Delete Project
  const handleDelete = (index) => {
    console.log("index",index)
    console.log("projects[index]", projects[index])
    const id = projects[index]._id
    console.log(id)
    axios.delete(`http://localhost:4000/deleteProject?_id=${id}`)
            .then((res) => {
                doupdate(!update)
                console.log("res",res)
                // setOpen(true)
                // setAlert({
                //     value: true,
                //     msg: "Expense deleted!",
                //     type: "success"
                // })
            }).catch((err) => {
                console.log("Error", err)
                // setAlert({
                //     value: false,
                //     msg: "Error occured while deleting data!",
                //     type: "error"
                // })
            })
  };

  // Handle Save from Dialog
  const handleSave = (updatedProject) => {
    console.log("updatedProject",updatedProject)
    const id = currentProject._id
    console.log("handleUpdateMain", id)
        if((!updatedProject.ProjectName) || (!updatedProject.StartDate) || (!updatedProject.State) || (!updatedProject.City)){
            console.log("empty field validation data", updatedProject)
            // setOpen(true)
            // setAlert({
            //     value: false,
            //     msg: "Please enter all mandatory fields",
            //     type: "error"
            // })
        }
        else{
            axios.put(`http://localhost:4000/updateProject?_id=${id}`, updatedProject)
            .then((res) => {
                doupdate(!update)
                // setOpen(true)
                console.log("res",res)
                // setAlert({
                //     value: true,
                //     msg: res.data.isSuccess? "Expense Updated!":"Data updation unsuccessful",
                //     type: res.data.isSuccess? "success":"error"
                // })
            }).catch((err) => {
                console.log("Error", err)
                // setAlert({
                //     value: false,
                //     msg: "Error occured while updating data!",
                //     type: "error"
                // })
            })
            setSelectedProject(null)
        }
  };

  return (
    <div className="mainBody">
      <div className="dashboard-container">
        <NGONavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="mainWindow">
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-item" onClick={toggleSidebar} style={{ fontWeight: 700 }}>
              <a href="/profile">Profile</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/post-project">Post Project</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/manage-projects">Manage Projects</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/view-volunteers">View Volunteers</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/manage-donations">View Donations</a>
            </div>
          </div>
          <div className="projects-container">
            <h2 className="projects-heading">All NGO Projects</h2>
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Start Date</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.ProjectName}</td>
                    <td>{project.StartDate}</td>
                    <td className={project.State === "Ongoing" ? "ongoing-status" : "completed-status"}>
                      {project.State}
                    </td>
                    <td>{project.City}</td>
                    <td>{project.Description}</td>
                    <td className="project-actions">
                      <button className="edit-btn" onClick={() => handleEdit(index)}>
                        <Edit fontSize="small" />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}>
                        <Delete fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />

      {/* Edit Project Dialog */}
      {selectedProject && (
        <EditProjectDialog
          project={selectedProject}
          onSave={handleSave}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default NGOManageProjects;
