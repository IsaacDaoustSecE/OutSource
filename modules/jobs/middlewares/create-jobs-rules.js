const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createUserRules = [
    body("freelancer")
        .notEmpty()
        .isString()
        .withMessage("Freelancer must be a freelancer id string")
        .trim(),

    body("title").notEmpty().withMessage("Title is required"),

    body("price").isNumeric().notEmpty().withMessage("Price is required"),
    body("expected_duration_days")
        .notEmpty()
        .isNumeric()
        .notEmpty()
        .withMessage("Expected duration is required"),

    checkValidation,
];

module.exports = createUserRules;
