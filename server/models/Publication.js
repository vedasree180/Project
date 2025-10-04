const mongoose = require("mongoose");
const publicationSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  year: Number,
  journal: String,
  teamId: String,
  country: String
});
module.exports = mongoose.models.Publication || mongoose.model("Publication", publicationSchema);