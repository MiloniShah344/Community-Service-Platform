import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (receipt) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Donation Receipt", 14, 22);
  doc.setFontSize(12);

  const data = [
    ["Project Name", receipt.projectName],
    ["Amount Donated", `₹${receipt.amount}`],
    ["Date", new Date(receipt.date).toLocaleString()],
    ["City", receipt.city],
    ["Start Date", receipt.startDate],
    ["Status", receipt.status],
    ["Description", receipt.description],
  ];

  data.forEach(([label, value], i) => {
    doc.text(`${label}: ${value}`, 14, 40 + i * 10);
  });

  doc.save(`Receipt_${receipt.projectName}.pdf`);
};
