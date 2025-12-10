const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const createUserRules = [
    body("skills").isString().withMessage("skills must be a string").trim(),
    body("field").isString().withMessage("field must be a string").trim(),
    body("bio").isString().withMessage("bio must be a string").trim(),
    body("user").isString().withMessage("user must be a string user id").trim(),

    checkValidation,
];

module.exports = createUserRules;
