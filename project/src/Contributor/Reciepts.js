// Reciepts.js
import React, { useEffect, useState } from 'react';
import ContNavbar from './ContNavbar';
import Footer from '../Main Page/Footer';
import axios from 'axios';
import ReceiptDialog from './RecieptDialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './RecieptCard.css';
import ReactDOM from 'react-dom/client';

import './UpcomingProjects.css';

const Reciepts = () => {
  const [user, setUser] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const uniqueId = localStorage.getItem("UniqueIdAtLogin");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (uniqueId) {
      axios.get(`http://localhost:4000/getSpecificCont?UniqueId=${uniqueId}`)
        .then(res => setUser(res.data.data))
        .catch(err => console.error("Error fetching user:", err));

      axios.get(`http://localhost:4000/getReceipts?userId=${uniqueId}`)
        .then(res => setReceipts(res.data.data))
        .catch(err => console.error("Error fetching receipts:", err));
    }
  }, [uniqueId]);

   // 👈 Add at top with your imports

const handleDownload = async (receipt) => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container); // 👈 FIX: Use correct render method
  root.render(
    <ReceiptDialog
      receiptData={receipt}
      contributorName={user.name}
      uniqueId={user.UniqueId}
      forPDF
    />
  );

  setTimeout(async () => {
    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${receipt.projectName}_receipt.pdf`);
    root.unmount(); // Clean up DOM
    document.body.removeChild(container);
  }, 300);
};


  return (
    <div className="mainBody">
      <div className="dashboard-container">
        <ContNavbar />
        <div className="mainWindow upcoming-container">
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/contributor-profile">Profile</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/upcoming-project">Upcoming Projects</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/participated-projects">Participated Projects</a>
            </div>
            <div className="sidebar-item" onClick={toggleSidebar}>
              <a href="/reciepts">Reciepts</a>
            </div>
          </div>
          <h2 className="upcoming-heading">Your Donation Receipts</h2>

          {receipts.length === 0 ? (
            <p className="empty-text">You haven't donated to any projects yet.</p>
          ) : (
            <div className="receipt-card-wrapper">
              {receipts.map((receipt, index) => (
                <div key={index} className="receipt-card">
                  <div className="receipt-info">
                    <h3>{receipt.projectName}</h3>
                    <p><strong>Donation Date:</strong> {new Date(receipt.date).toLocaleString()}</p>
                  </div>
                  <div className="receipt-actions">
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedReceipt(receipt);
                        setOpenDialog(true);
                      }}
                    >
                      View Receipt
                    </button>
                    <button
                      className="download-btn"
                      onClick={() => handleDownload(receipt)}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedReceipt && user && openDialog && (
            <div className="receipt-dialog-overlay" onClick={() => setOpenDialog(false)}>
              <div className="receipt-dialog-content" onClick={(e) => e.stopPropagation()}>
                <ReceiptDialog
                  receiptData={selectedReceipt}
                  contributorName={user.name}
                  uniqueId={user.UniqueId}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reciepts;
