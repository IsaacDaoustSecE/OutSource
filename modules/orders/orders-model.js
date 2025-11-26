const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
