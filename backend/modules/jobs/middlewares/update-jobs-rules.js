const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateJobsRules = [
    body("freelancer").optional().isString().trim(),

    body("title").optional(),

    body("price").isNumeric().optional(),
    body("expected_duration_days").optional().isNumeric(),

    checkValidation,
];

module.exports = updateJobsRules;
