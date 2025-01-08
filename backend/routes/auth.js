const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate input
        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." }); // 409 Conflict
        }

        // Hash the password and save the user
        const hashpassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            email,
            username,
            password: hashpassword,
        });

        await newUser.save();
        return res.status(201).json({ message: "Sign Up Successful." }); // 201 Created
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal Server Error." }); // 500 Internal Server Error
    }
});

// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up first." }); // 404 Not Found
        }

        // Compare the passwords
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password." }); // 401 Unauthorized
        }

        // Send user data excluding the password
        const { password: userPassword, ...others } = user._doc;
        return res.status(200).json({ message: "Sign In Successful.", user: others });
    } catch (error) {
        console.error("Sign In Error:", error);
        return res.status(500).json({ message: "Internal Server Error." }); // 500 Internal Server Error
    }
});

module.exports = router;