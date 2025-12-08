const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, required: true, unique: true },

        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            required: true,
        },

        createdAt: { type: mongoose.Schema.Types.Date, default: Date.now() },
    },
    { versionKey: false }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = encodePassword(this.password);
    }

    next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
