const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateUserRules = [
    body("from_user")
        .isString()
        .optional()
        .withMessage("from_user must be a user id string"),

    body("to_user")
        .isString()
        .optional()
        .withMessage("to_user must be a valid email address"),
    body("text")
        .isString()
        .optional()
        .withMessage("text must be included to send a message"),

    checkValidation,
];

module.exports = updateUserRules;
