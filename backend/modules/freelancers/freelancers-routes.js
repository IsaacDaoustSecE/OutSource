const { Router } = require("express");
const createFreelancerRules = require("./middlewares/create-freelancers-rules");
const updateFreelancerRules = require("./middlewares/update-freelancers-rules");
const FreelancerModel = require("./freelancers-model");
const mongoose = require("mongoose");

const freelancersRoute = Router();

freelancersRoute.get("/freelancers", async (req, res) => {
    const allFreelancers = await FreelancerModel.find().populate([
        "user",
        "jobs",
    ]);

    res.json(allFreelancers ? allFreelancers : []);
});

freelancersRoute.get("/freelancers/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybeFreelancer = await FreelancerModel.findById(id);

        if (!maybeFreelancer) {
            res.status(404).send("Freelancer not found");
        } else {
            res.status(200).json(maybeFreelancer);
        }
    } catch (e) {
        res.status(500).send("Unable to get Freelancer by id");
    }
});

freelancersRoute.post(
    "/freelancers",
    createFreelancerRules,
    async (req, res) => {
        try {
            const newFreelancer = await FreelancerModel.create({
                ...req.body,
            });

            res.status(200).json(newFreelancer);
        } catch (e) {
            res.status(500).send("Unable to add Freelancer");
        }
    }
);

freelancersRoute.put(
    "/freelancers/:id",
    updateFreelancerRules,
    async (req, res) => {
        const FreelancerId = req.params.id;

        try {
            const FreelancerExists = await FreelancerModel.exists({
                _id: FreelancerId,
            });

            if (!FreelancerExists) {
                res.status(404).send("Freelancer not found");
            } else {
                const updatedFreelancer =
                    await FreelancerModel.findByIdAndUpdate(
                        FreelancerId,
                        req.body,
                        { new: true }
                    );

                if (!updatedFreelancer) {
                    res.status(500).send("Unable to update Freelancer");
                } else {
                    res.status(200).json(updatedFreelancer);
                }
            }
        } catch (e) {
            res.status(500).send("Unable to update Freelancer");
        }
    }
);

freelancersRoute.delete("/freelancers/:id", async (req, res) => {
    const FreelancerId = req.params.id;

    try {
        const maybeFreelancer = await FreelancerModel.findById(FreelancerId);

        if (!maybeFreelancer) {
            res.status(404).send("Freelancer not found");
        } else {
            const deletedFreelancer = await FreelancerModel.deleteOne({
                _id: FreelancerId,
            });

            if (!deletedFreelancer) {
                res.status(500).send("Unable to delete Freelancer");
            } else {
                res.status(200).json(maybeFreelancer);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to delete Freelancer");
    }
});

module.exports = { freelancersRoute };
