const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    // myCart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
