const mongoose = require("mongoose");

// Use environment variables to store your DB credentials
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const conn = async (req,res) => {
   try {
    await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.mongodb.net`).then(()=> {
        console.log("MongoDB Connected");
    });
   } catch (error) {
        res.status(400).json({
            message: "MongoDB Not Connected",
        });
   }
}
conn();