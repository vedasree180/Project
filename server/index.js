// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

<<<<<<< HEAD
const knowledgeRoutes = require('./routes/knowledge');
const userRoutes = require('./routes/user');      // simple auth stubs (optional)
const dashboardRoutes = require('./routes/dashboard'); // optional
=======
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const knowledgeRoute = require('./routes/knowledge');
const userRoute = require('./routes/user');
const aiRoute = require('./routes/ai');
>>>>>>> e67710b3968f98a6eb7d7543ec4cf68d31a6b33a

const app = express();
app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
// static if you want to serve client build later:
// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
=======
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.log("⚠️ MongoDB connection failed, continuing without database...");
    console.log("AI functionality will still work");
  });

app.use('/api/auth', authRoute);
app.use("/api/dashboard-stats", dashboardRoute);
app.use('/api/knowledge', knowledgeRoute);
app.use('/api/user', userRoute);
app.use('/api/ai', aiRoute);
>>>>>>> e67710b3968f98a6eb7d7543ec4cf68d31a6b33a

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
