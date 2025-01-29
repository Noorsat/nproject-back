const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://itsnursat:itsnoorsat@cluster0.i20jq.mongodb.net/');

const recordSchema = new mongoose.Schema({
  npp: Number,
  type: String,
  numberOfDeal: String,
  dateStart: String,
  dateEnd: String,
  status: String,
  category: String,
  additionalAgreement: String,
  additionalAgreementPrice010724: String,
  additionalAgreementPrice011024: String,
  technicalPart: String,
  contragent: String,
  bin: String,
  address: String,
  activityType: String,
  usageType: String,
  maintenanceContract: String,
  meterVerificationDate: String,
  contacts: String,
  email: String,
});

const Record = mongoose.model('Record', recordSchema);

app.get('/api/records', async (req, res) => {
  try {
    const records = await Record.find();
    return res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/records', async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    return res.status(201).json(savedRecord);
  } catch (error) {
    console.error('Error saving record:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
