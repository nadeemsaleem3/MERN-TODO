const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email validation
        },
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20,
            match: [/^[a-zA-Z0-9_-]+$/, "Invalid username format"], // Alphanumeric with underscores and hyphens
        },
        password: { type: String, required: true },
        list: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "List",
            },
        ],
    },
    { timestamps: true } // Adds createdAt and updatedAt
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip hashing if password is unchanged
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Index for optimized queries
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

module.exports = mongoose.model("User", userSchema);