const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    list: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
        },
    ],
});

module.exports = mongoose.model("User", userSchema);