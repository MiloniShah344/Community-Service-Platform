import React,{useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./ProjectCompletionGraph.css";
import axios from 'axios'

// const projectData = [
//   { month: "Jan 24", projects: 5 },
//   { month: "Feb 24", projects: 8 },
//   { month: "Mar 24", projects: 12 },
//   { month: "Apr 24", projects: 18 },
//   { month: "May 24", projects: 25 },
//   { month: "Jun 24", projects: 30 },
//   { month: "Jul 24", projects: 40 },
//   { month: "Aug 24", projects: 50 },
//   { month: "Sep 24", projects: 60 },
//   { month: "Oct 24", projects: 75 },
//   { month: "Nov 24", projects: 90 },
//   { month: "Dec 24", projects: 110 },
//   { month: "Jan 25", projects: 130 },
//   { month: "Feb 25", projects: 150 },
//   { month: "Mar 25", projects: 170 },
//   { month: "Apr 25", projects: 190 },
// ];

const ProjectCompletionGraph = () => {

  const [projectData, setprojectData] = React.useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/getCompletedPrj`)
    .then((res) => {
        console.log("res.data.data in useEffect", res.data.data)
        
        setprojectData(res.data.data)
      }).catch((err) => {
        console.log("Error", err)
        
      })
}, [])

  return (
    <div className="project-graph-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={projectData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Projects" fill="url(#colorProjects)" barSize={40} radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fc8f8f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#efbfbf" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectCompletionGraph;
