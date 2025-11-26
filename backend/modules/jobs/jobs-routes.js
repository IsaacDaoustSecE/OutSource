const { Router } = require("express");
const createjobRules = require("./middlewares/create-jobs-rules");
const updatejobRules = require("./middlewares/update-jobs-rules");
const jobModel = require("./jobs-model");

const jobsRoute = Router();

jobsRoute.get("/jobs", async (req, res) => {
    const alljobs = await jobModel.find();

    res.json(alljobs ? alljobs : []);
});

jobsRoute.get("/jobs/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const maybejob = await jobModel.findById(id);

        if (!maybejob) {
            res.status(404).send("job not found");
        } else {
            res.status(200).json(maybejob);
        }
    } catch (e) {
        res.status(500).send("Unable to get job by id");
    }
});

jobsRoute.post("/jobs", createjobRules, async (req, res) => {
    try {
        const newjob = await jobModel.create({
            ...req.body,
        });

        res.status(200).json(newjob);
    } catch (e) {
        res.status(500).send("Unable to add job");
    }
});

jobsRoute.put("/jobs/:id", updatejobRules, async (req, res) => {
    const jobId = req.params.id;

    try {
        const jobExists = await jobModel.exists({
            _id: jobId,
        });

        if (!jobExists) {
            res.status(404).send("job not found");
        } else {
            const updatedjob = await jobModel.findByIdAndUpdate(
                jobId,
                req.body,
                { new: true }
            );

            if (!updatedjob) {
                res.status(500).send("Unable to update job");
            } else {
                res.status(200).json(updatedjob);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to update job");
    }
});

jobsRoute.delete("/jobs/:id", async (req, res) => {
    const jobId = req.params.id;

    try {
        const maybejob = await jobModel.findById(jobId);

        if (!maybejob) {
            res.status(404).send("job not found");
        } else {
            const deletedjob = await jobModel.deleteOne({
                _id: jobId,
            });

            if (!deletedjob) {
                res.status(500).send("Unable to delete job");
            } else {
                res.status(200).json(maybejob);
            }
        }
    } catch (e) {
        res.status(500).send("Unable to delete job");
    }
});

module.exports = { jobsRoute };
