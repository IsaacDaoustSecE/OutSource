const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    expected_duration_days: { type: Number, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

const JobModel = mongoose.model("job", jobSchema);

module.exports = JobModel;
