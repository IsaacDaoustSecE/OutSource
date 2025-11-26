const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createUserRules = [
    body("from_user")
        .isString()
        .notEmpty()
        .withMessage("from_user must be a user id string"),

    body("to_user")
        .isString()
        .notEmpty()
        .withMessage("to_user must be a valid email address"),

    checkValidation,
];

module.exports = createUserRules;
