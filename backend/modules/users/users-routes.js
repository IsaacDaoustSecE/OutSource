const { Router } = require("express");
const createUserRules = require("./middlewares/create-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");
const UserModel = require("./users-model");

// Create a new Express router instance
const usersRoute = Router();

/**
 * GET /users
 * Returns a list of all users
 */
usersRoute.get("/users", async (req, res) => {
    const allUsers = await UserModel.find();
    // Return users or an empty array if none found
    res.json(allUsers ? allUsers : []);
});

/**
 * GET /users/:id
 * Returns a single user by ID
 */
usersRoute.get("/users/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybeUser = await UserModel.findById(id);

        if (!maybeUser) {
            // If no user found, respond with 404
            res.status(404).send("User not found");
        } else {
            res.status(200).json(maybeUser);
        }
    } catch (e) {
        // Catch invalid ObjectId errors or DB issues
        res.status(500).send("Unable to get user by id");
    }
});

/**
 * POST /users
 * Creates a new user
 * Uses validation middleware: createUserRules
 */
usersRoute.post("/users", createUserRules, async (req, res) => {
    try {
        const newUser = await UserModel.create({
            ...req.body,
        });

        res.status(200).json(newUser);
    } catch (e) {
        // Handle validation or DB errors
        res.status(500).send("Unable to add user");
    }
});

/**
 * PUT /users/:id
 * Updates an existing user
 * Uses validation middleware: updateUserRules
 */
usersRoute.put("/users/:id", updateUserRules, async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if user exists before attempting update
        const userExists = await UserModel.exists({ _id: userId });

        if (!userExists) {
            res.status(404).send("User not found");
        } else {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                req.body,
                { new: true } // return updated document
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

/**
 * DELETE /users/:id
 * Deletes a user by ID
 */
usersRoute.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if user exists
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
                // Return deleted user data
                res.status(200).json(maybeUser);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to delete user");
    }
});

module.exports = { usersRoute };
