import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ctb';
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error', err.message));

const patientSchema = new mongoose.Schema({
  trialId: String,
  date: Date,
  newRecruits: Number,
  cumulativeRecruits: Number,
  source: String
}, { timestamps: true });

const costSchema = new mongoose.Schema({
  trialId: String,
  date: Date,
  category: String,
  amount: Number,
  currency: String,
  vendor: String
}, { timestamps: true });

const forecastSchema = new mongoose.Schema({
  trialId: String,
  model: String,
  generatedAt: Date,
  horizonDays: Number,
  results: Object,
  metrics: Object
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
const Cost = mongoose.model('Cost', costSchema);
const Forecast = mongoose.model('Forecast', forecastSchema);

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/patients', async (_req, res) => {
  const items = await Patient.find().sort({ date: 1 });
  res.json(items);
});
app.post('/patients', async (req, res) => {
  const doc = await Patient.create(req.body);
  res.status(201).json(doc);
});

app.get('/costs', async (_req, res) => {
  const items = await Cost.find().sort({ date: 1 });
  res.json(items);
});
app.post('/costs', async (req, res) => {
  const doc = await Cost.create(req.body);
  res.status(201).json(doc);
});

app.post('/forecasts', async (req, res) => {
  try {
    const { trialId, model = 'baseline', horizonDays = 90 } = req.body || {};
    const { data } = await axios.post(`${ML_SERVICE_URL}/forecast`, { trialId, model, horizonDays });
    await Forecast.create({
      trialId, model, generatedAt: new Date(), horizonDays,
      results: data.results, metrics: data.metrics
    });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'ML service error', detail: err.message });
  }
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
