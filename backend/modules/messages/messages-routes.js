const { Router } = require("express");
const createMessageRules = require("./middlewares/create-messages-rules");
const updateMessageRules = require("./middlewares/update-messages-rules");
const messageModel = require("./messages-model");
const UserModel = require("../users/users-model");

const messagesRoute = Router();

messagesRoute.get("/messages", async (req, res) => {
    const allMessages = await messageModel.find();

    res.json(allMessages ? allMessages : []);
});

messagesRoute.get("/messages/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybeMessage = await messageModel.findById(id);

        if (!maybeMessage) {
            res.status(404).send("message not found");
        } else {
            res.status(200).json(maybeMessage);
        }
    } catch (e) {
        res.status(500).send("Unable to get message by id");
    }
});

messagesRoute.get("/messages/user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybeUser = await UserModel.findById(id);

        if (!maybeUser) {
            return res.status(404).send("user not found");
        }

        const maybeMessage = await messageModel
            .find({
                toUser: maybeUser,
            })
            .populate("fromUser");

        if (!maybeMessage) {
            res.status(404).send("message not found");
        } else {
            res.status(200).json(maybeMessage);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Unable to get message by id");
    }
});

messagesRoute.post("/messages", createMessageRules, async (req, res) => {
    try {
        const to = await UserModel.findById(req.body.to_user);
        const from = await UserModel.findById(req.body.from_user);

        if (!to || !from) {
            return res.status(500).send("Unable to find to or from user");
        }

        const newMessage = await messageModel.create({
            ...req.body,
            toUser: to,
            fromUser: from,
        });

        res.status(200).json(newMessage);
    } catch (e) {
        console.error(e);
        res.status(500).send("Unable to add message");
    }
});

messagesRoute.put("/messages/:id", updateMessageRules, async (req, res) => {
    const messageId = req.params.id;

    try {
        const messageExists = await messageModel.exists({ _id: messageId });

        if (!messageExists) {
            res.status(404).send("message not found");
        } else {
            const updatedMessage = await messageModel.findByIdAndUpdate(
                messageId,
                req.body,
                { new: true }
            );

            if (!updatedMessage) {
                res.status(500).send("Unable to update message");
            } else {
                res.status(200).json(updatedMessage);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to update message");
    }
});

messagesRoute.delete("/messages/:id", async (req, res) => {
    const messageId = req.params.id;

    try {
        const maybeMessage = await messageModel.findById(messageId);

        if (!maybeMessage) {
            res.status(404).send("message not found");
        } else {
            const deletedMessage = await messageModel.deleteOne({
                _id: messageId,
            });

            if (!deletedMessage) {
                res.status(500).send("Unable to delete message");
            } else {
                res.status(200).json(maybeMessage);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to delete message");
    }
});

module.exports = { messagesRoute };
