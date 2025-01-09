const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
require("./conn/conn");

const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from your frontend
    credentials: true  // If using cookies or authentication tokens
  }));

app.get("/", (req, res) => {
    res.send("Hello Nadeem, Welcom to Basic Server.");
});


app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
console.log("Sever Started Successfully");
});