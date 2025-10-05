// server/models/Activity.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Fix for OverwriteModelError
export default mongoose.models.Activity || mongoose.model("Activity", activitySchema);
