const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
    skills: { type: String, required: true },
    field: { type: String, required: true },
    bio: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

const FreelancerModel = mongoose.model("Freelancer", freelancerSchema);

module.exports = FreelancerModel;
