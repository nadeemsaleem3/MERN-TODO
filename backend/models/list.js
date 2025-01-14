const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100, // Max length for the title
        },
        body: {
            type: String,
            required: true,
            maxlength: 1000, // Max length for the body
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Each task must be associated with a user
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Index the user field for faster lookups
listSchema.index({ user: 1 });

module.exports = mongoose.model("List", listSchema);