require("dotenv").config();
const express = require("express");
const app = express();
const  mongoose = require("mongoose");
require("./db/conn.js");
const foods = require("./models/userSchema.js");
const cors = require("cors");
const router = require("./routes/router.js");


const port = process.env.PORT || 8005;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`server is starting on port number ${port}`);
});