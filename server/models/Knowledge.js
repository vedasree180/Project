const mongoose = require("mongoose");

// ✅ Define the schema first
const knowledgeSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Export the model safely to prevent OverwriteModelError
module.exports = mongoose.models.Knowledge || mongoose.model("Knowledge", knowledgeSchema);
