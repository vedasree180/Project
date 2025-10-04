const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const knowledgeRoute = require('./routes/knowledge');
const userRoute = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/auth', authRoute);
app.use("/api/dashboard-stats", dashboardRoute);
app.use('/api/knowledge', knowledgeRoute);
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
