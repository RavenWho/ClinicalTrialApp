import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import authRoutes from "./routes/auth.routes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use(morgan('dev'));

// Temporary in-memory "users" store
const users = [];


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

app.get("/auth/test", (req, res) => {
  res.json({ message: "Direct auth route working " });
});

app.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // check if user already exists
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
    };

    users.push(user);

    return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2) compare password with hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3) create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "dev-secret-change-me",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "dev-secret-change-me",
    (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "Token invalid or expired" });
      }
      req.user = payload; // { userId, email, iat, exp }
      next();
    }
  );
}

// Example protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated 🎉",
    user: req.user,
  });
});



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
