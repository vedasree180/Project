// server/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';

import knowledgeRoutes from './routes/knowledge';
import userRoutes from './routes/user';      // simple auth stubs (optional)
import dashboardRoutes from './routes/dashboard'; // optional
import authRoute from './routes/auth';
import aiRoute from './routes/ai';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// static if you want to serve client build later:
// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("⚠️ MongoDB connection failed, continuing without database...");
    console.log("AI functionality will still work");
  }
};

connectToDB();

app.use('/api/auth', authRoute);
app.use("/api/dashboard-stats", dashboardRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
