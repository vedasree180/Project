// server/models/Publication.js
import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  year: Number,
  journal: String,
  teamId: String,
  country: String
});

// ✅ Fix for OverwriteModelError
export default mongoose.models.Publication || mongoose.model('Publication', publicationSchema);
