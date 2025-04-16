import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminDashboard = () => {
  const [contributors, setContributors] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [reload, setReload] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/getAllContributor")
      .then(res => {
        const unverified = res.data.data.filter(user => !user.isVerified);
        setContributors(unverified);
      });

    axios.get("http://localhost:4000/getAllNGO")
      .then(res => {
        const unverified = res.data.data.filter(user => !user.isVerified);
        setNgos(unverified);
      });
  }, [reload]);

  const handleVerify = (role, uniqueId) => {
    const api = role === "Contributor"
      ? `http://localhost:4000/verifyCont`
      : `http://localhost:4000/verifyNGO`;

    axios.put(api, {
      UniqueId: uniqueId,
      isVerified: true,
    })
      .then(res => {
        if (res.data.isSuccess) {
          setSnackbar({
            open: true,
            message: `${role} verified successfully!`,
            severity: "success",
          });
          setReload(!reload);
        } else {
          setSnackbar({
            open: true,
            message: res.data.message || `Error verifying ${role}`,
            severity: "error",
          });
        }
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: `Error verifying ${role}`,
          severity: "error",
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Verification Panel</h1>

      <div className="admin-section">
        <h2>Pending Contributors</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Unique ID</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((user) => (
              <tr key={user.UniqueId}>
                <td>{user.FullName}</td>
                <td>{user.UserName}</td>
                <td>{user.UniqueId}</td>
                <td>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleVerify("Contributor", user.UniqueId)}
                  >
                    Verify
                  </Button>
                </td>
              </tr>
            ))}
            {contributors.length === 0 && (
              <tr>
                <td colSpan={4}>All contributors verified!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h2>Pending NGOs</h2>
        <table>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Username</th>
              <th>Unique ID</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {ngos.map((ngo) => (
              <tr key={ngo.UniqueId}>
                <td>{ngo.OrganizationName}</td>
                <td>{ngo.UserName}</td>
                <td>{ngo.UniqueId}</td>
                <td>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleVerify("NGO", ngo.UniqueId)}
                  >
                    Verify
                  </Button>
                </td>
              </tr>
            ))}
            {ngos.length === 0 && (
              <tr>
                <td colSpan={4}>All NGOs verified!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
