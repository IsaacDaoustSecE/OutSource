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
        .withMessage("to_user must be a user id string"),
    body("subject")
        .isString()
        .notEmpty()
        .withMessage("subject must be included to send a message"),
    body("text")
        .isString()
        .notEmpty()
        .withMessage("text must be included to send a message"),

    checkValidation,
];

module.exports = createUserRules;
