// RecieptCard.js
import React, { useRef } from 'react';
import './RecieptCard.css';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RecieptCard = ({ receiptData, contributorName }) => {
  const receiptRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${receiptData.projectName}_receipt.pdf`);
  };

  return (
    <div className="receipt-card-container">
      <div className="receipt-card" ref={receiptRef}>
        <h2>Donation Receipt</h2>
        <div className="receipt-line" />
        <p><strong>Contributor Name:</strong> {contributorName}</p>
        <p><strong>Project Name:</strong> {receiptData.projectName}</p>
        <p><strong>Description:</strong> {receiptData.description}</p>
        <p><strong>Amount Donated:</strong> ₹{receiptData.amount}</p>
        <p><strong>Date & Time:</strong> {receiptData.date}</p>
        <p className="thank-you">Thank you for your support ❤️</p>
      </div>
      <Button
        variant="contained"
        style={{ backgroundColor: '#6a8caf', color: '#fff', marginTop: '10px' }}
        onClick={downloadPDF}
      >
        Download
      </Button>
    </div>
  );
};

export default RecieptCard;
