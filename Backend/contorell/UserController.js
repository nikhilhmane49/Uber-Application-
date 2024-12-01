
//install packages

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');


//importing the other files 

const UserRegSchema = require('../models/User/UserRegModel');

//-------------------------------------userRegisteration


const userRegisteration = async (req, res) => {

    try {
        const { fullname, email, password, socketId } = req.body;

     const { firstname, lastname } = fullname;
        
//filled validation
        if (!fullname|| !fullname.firstname || !fullname.lastname  || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        //User allready registration or not
        
        const user = await UserRegSchema.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }



        //email validation
        
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email'
            });
        }

        //password validation
        
        if (!validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            return res.status(400).json({
                success: false,
                message: 'Password should be strong and contain at least 8 characters, including uppercase, lowercase, numbers, and symbols'
            });
        }

//hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);


        //save the data in the database
        
        const userdata = {
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,
            socketId
        }


        const newUser = new UserRegSchema(userdata);
        const newuser = await newUser.save();
        
        //genret the token
        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);


res.status(201).json({
    success: true,
    token:token,
    message: 'User registered successfully',
    data: newUser
});


    } 
  catch (error) {
    console.error(error);
    res.status(500).json({
        success: false,
        message: 'An error occurred during registration',
        error: error.message
    });
}

}
 


//------------------------user login-----------------------

const userLogin = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        //filled validation
        
        if (!email ||!password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        const user = await UserRegSchema.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { 
           return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
          
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        res.status(200).json({
            success: true,
            token: token,
            message: 'User logged in successfully'
        })

    } catch (error) {
  console.error(error);
    res.status(500).json({
        success: false,
        message: 'An error occurred during registration',
        error: error.message
    });
    }
}

//------------------------User profile

const userProfile = async (req, res) => {
    const { userid } = req.body;
    try {
        const user = await UserRegSchema.findById(userid).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}



module.exports = { userRegisteration ,userLogin ,userProfile};