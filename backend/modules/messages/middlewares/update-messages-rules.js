const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const updateUserRules = [
    body("from_user").isString().optional(),

    body("to_user").isString().optional(),
    body("subject").isString().optional(),
    body("text").isString().optional(),

    checkValidation,
];

module.exports = updateUserRules;
