const express = require("express");

const app = express();

//request handler
app.use("/",(req,res) => {
    res.send("Hello from the server!");
})

app.use("/test", (req,res) => {
    res.send("hello from the server test");
})

app.listen(7777, ()=>{
    console.log("Server is listening to port 7777");
});