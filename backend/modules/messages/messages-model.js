const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
