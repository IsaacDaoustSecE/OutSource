const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateJobsRules = [
    body("freelancer").optional().isString().trim(),

    body("title").optional().withMessage("Title is required"),

    body("price").isNumeric().optional().withMessage("Price is required"),
    body("expected_duration_days")
        .optional()
        .isNumeric()
        .withMessage("Expected duration is required"),

    checkValidation,
];

module.exports = updateJobsRules;
