import React, {useState, useEffect} from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./VolunteerGraph.css";
import axios from 'axios'

// const data = [
//   { month: "Jan", volunteers: 20 },
//   { month: "Feb", volunteers: 35 },
//   { month: "Mar", volunteers: 50 },
//   { month: "Apr", volunteers: 80 },
//   { month: "May", volunteers: 120 },
//   { month: "Jun", volunteers: 180 },
//   { month: "Jul", volunteers: 250 },
//   { month: "Aug", volunteers: 320 },
//   { month: "Sep", volunteers: 400 },
//   { month: "Oct", volunteers: 500 },
//   { month: "Nov", volunteers: 620 },
//   { month: "Dec", volunteers: 700 },
//   { month: "Jan", volunteers: 800 },
//   { month: "Feb", volunteers: 830 },
//   { month: "Mar", volunteers: 950 },
//   { month: "Apr", volunteers: 1050 }
// ];

const VolunteerGraph = () => {

  const [growth, setGrowth] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/getVolGrowth`)
    .then((res) => {
        console.log("res.data.data in useEffect", res.data.data)
        
        setGrowth(res.data.data)
      }).catch((err) => {
        console.log("Error", err)
        
      })
}, [])

  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={growth} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008080" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00d4d4" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip /> 
          <Area type="monotone" dataKey="Volunteers" stroke="#008080" fillOpacity={1} fill="url(#colorVolunteers)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolunteerGraph;
