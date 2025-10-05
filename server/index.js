// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const knowledgeRoutes = require('./routes/knowledge');
const userRoutes = require('./routes/user');      // simple auth stubs (optional)
const dashboardRoutes = require('./routes/dashboard'); // optional

const app = express();
app.use(cors());
app.use(bodyParser.json());

// static if you want to serve client build later:
// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
