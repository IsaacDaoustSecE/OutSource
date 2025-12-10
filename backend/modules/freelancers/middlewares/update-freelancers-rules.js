const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateUserRules = [
    body("skills").optional().isString().trim(),
    body("field").optional().isString().trim(),
    body("bio").optional().isString().trim(),
    body("user").optional().isString().trim(),

    checkValidation,
];

module.exports = updateUserRules;
