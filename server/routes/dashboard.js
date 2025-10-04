const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const totalPublications = await Publication.countDocuments();
    const publicationsChange = 12; // placeholder for dynamic calculation

    const researchTeams = await User.distinct("teamId").then(arr => arr.length);
    const teamsChange = 8;

    const successRate = Math.floor(Math.random() * 100); // placeholder
    const successChange = 3;

    const countries = await User.distinct("country").then(arr => arr.length);
    const countriesChange = 2;

    res.json({
      totalPublications,
      publicationsChange,
      researchTeams,
      teamsChange,
      successRate,
      successChange,
      countries,
      countriesChange
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
