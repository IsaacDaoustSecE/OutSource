const { Router } = require("express");
const createUserRules = require("./middlewares/create-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");
const UserModel = require("./users-model");

const usersRoute = Router();

usersRoute.get("/users", async (req, res) => {
    const allUsers = await UserModel.find();

    res.json(allUsers ? allUsers : []);
});

usersRoute.get("/users/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybeUser = await UserModel.findById(id);

        if (!maybeUser) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(maybeUser);
        }
    } catch (e) {
        res.status(500).send("Unable to get user by id");
    }
});

usersRoute.post("/users", createUserRules, async (req, res) => {
    try {
        const newUser = await UserModel.create({
            ...req.body,
        });

        res.status(200).json(newUser);
    } catch (e) {
        res.status(500).send("Unable to add user");
    }
});

usersRoute.put("/users/:id", updateUserRules, async (req, res) => {
    const userId = req.params.id;

    try {
        const userExists = await UserModel.exists({ _id: userId });

        if (!userExists) {
            res.status(404).send("User not found");
        } else {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                req.body,
                { new: true }
            );

            if (!updatedUser) {
                res.status(500).send("Unable to update user");
            } else {
                res.status(200).json(updatedUser);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to update user");
    }
});

usersRoute.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const maybeUser = await UserModel.findById(userId);

        if (!maybeUser) {
            res.status(404).send("User not found");
        } else {
            const deletedUser = await UserModel.deleteOne({
                _id: userId,
            });

            if (!deletedUser) {
                res.status(500).send("Unable to delete user");
            } else {
                res.status(200).json(maybeUser);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to delete user");
    }
});

module.exports = { usersRoute };
