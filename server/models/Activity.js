// server/models/Activity.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Fix for OverwriteModelError
module.exports = mongoose.models.Activity || mongoose.model("Activity", activitySchema);
