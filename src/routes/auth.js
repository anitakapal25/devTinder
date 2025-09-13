const express = require("express");
const { validateSignUpData } = require("../utils/validation")
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
           
            const token = await user.getJWT();
            //add token to cookie and send response back to user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8*3600000)
            });
            res.send("Login Successfully")
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err) {
        res.status(400).send("ERROR: "+err.message);
    }
});

authRouter.post("/logout", async(req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successful!!");
})

module.exports = authRouter;