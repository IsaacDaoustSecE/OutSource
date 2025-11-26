const { body } = require("express-validator");
const checkValidation = require("../../../middlewares/check-validation");

const createUserRules = [
    body("name").isString().withMessage("Name must be a string").trim(),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

    checkValidation,
];

module.exports = createUserRules;
