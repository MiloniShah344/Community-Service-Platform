const express = require('express');
const router = express.Router();
const Receipt = require('../Model/RecieptSchema');

// Save receipt

const saveReceipt = async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    await receipt.save();
    res.status(200).json({ message: 'Receipt saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving receipt', error: err });
  }
}

// Get all receipts for user

const getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find({ userId: req.query.userId });
    res.status(200).json({ data: receipts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching receipts', error: err });
  }
}

module.exports = {saveReceipt, getReceipts};
