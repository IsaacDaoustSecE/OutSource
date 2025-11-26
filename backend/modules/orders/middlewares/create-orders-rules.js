const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createOrderRules = [
    body("user")
        .isString()
        .notEmpty()
        .withMessage("user must be a string user id")
        .trim(),
    body("job")
        .isString()
        .notEmpty()
        .withMessage("job must be a string job id")
        .trim(),

    checkValidation,
];

module.exports = createOrderRules;
