// ReceiptDialog.js
import React from 'react';
import './RecieptCard.css';

const ReceiptDialog = ({ receiptData, contributorName, uniqueId, forPDF = false }) => {
  return (
    <div className={`real-receipt-container ${forPDF ? 'pdf-mode' : ''}`}>
      <div className="real-receipt">
        <div className="receipt-header">
          <h2>🌟 Community Service Platform</h2>
          <p className="receipt-tagline">Official Donation Receipt</p>
        </div>

        <div className="receipt-body">
          <div className="receipt-row"><span>Contributor Name:</span> <strong>{contributorName}</strong></div>
          <div className="receipt-row"><span>Contributor ID:</span> <strong>{uniqueId}</strong></div>
          <div className="receipt-row"><span>Project:</span> <strong>{receiptData.projectName}</strong></div>
          <div className="receipt-row"><span>City:</span> <strong>{receiptData.city}</strong></div>
          <div className="receipt-row"><span>Status:</span> <strong>{receiptData.status}</strong></div>
          <div className="receipt-row"><span>Start Date:</span> <strong>{receiptData.startDate}</strong></div>
          <div className="receipt-row"><span>Description:</span> <strong>{receiptData.description}</strong></div>
          <div className="receipt-row highlight"><span>Amount Donated:</span> <strong>₹{receiptData.amount}</strong></div>
          <div className="receipt-row"><span>Date & Time:</span> <strong>{new Date(receiptData.date).toLocaleString()}</strong></div>
        </div>

        <div className="receipt-footer">
          <p className="thank-you-text">🙏 Thank you for making a difference!</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDialog;
