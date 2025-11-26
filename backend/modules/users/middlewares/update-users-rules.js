const { body } = require("express-validator");
const checkValidation = require("../../../middlewares/check-validation");

const updateCustomerRules = [
    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .trim(),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

    checkValidation,
];

module.exports = updateCustomerRules;
