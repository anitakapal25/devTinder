const express = require("express");
const connectDB = require('./config/database');
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);

connectDB()
    .then(() =>{
        console.log("DB connected");
        app.listen(7777, ()=>{
        console.log("Server is listening to port 7777");
        });
    })
    .catch((err) => {
        console.log("DB cannot connect")
    })
