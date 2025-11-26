const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateOrderRules = [
    body("user")
        .isString()
        .optional()
        .withMessage("user must be a string user id")
        .trim(),
    body("job")
        .isString()
        .optional()
        .withMessage("job must be a string job id")
        .trim(),

    checkValidation,
];

module.exports = updateOrderRules;
