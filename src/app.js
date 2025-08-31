const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
   //validation of data
   try{
        validateSignUpData(req);
        const {firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password,10);


        const user  = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
    
        //console.log(user);    
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }    
});

app.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login Successfully")
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err) {
        res.status(400).send("ERROR: "+err.message);
    }
})

app.get("/user", async (req,res) => {   
    try{
        const user = await User.findOne({'emailId':req.body.email});
        if(!user){
            res.status(404).send("User not found")
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send('Something went wrong')
    }
})

app.get("/feed", async (req,res) => {
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send("User not found")
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send('Something went wrong')
    }
})

app.get("/user/:id", async (req,res) => {   
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send("User not found")
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send('Something went wrong')
    }
})

app.patch("/user" , async(req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndUpdate(userId,req.body,{returnDocument:'after'});

        res.send(user);
    }catch(err){
        res.status(400).send('Something went wrong')
    }
})

app.delete("/user", async(req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
           return res.code(404).send('No user found')
        }
        res.send("User deleted ")
    }catch(err){
        res.status(400).send('Something went wrong')
    }
})

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
