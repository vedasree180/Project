// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  teamId: String,
  country: String
});

// ✅ Fix for OverwriteModelError
export default mongoose.models.User || mongoose.model('User', userSchema);
