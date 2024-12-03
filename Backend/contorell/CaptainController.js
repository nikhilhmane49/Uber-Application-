//install packages

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');


//import the file from other file

const CaptainSchema = require('../models/Captain/CaptainModel');
const blacklistTokenSchema = require('../models/User/BlacklistModel');



//============registration of the captian

const captainreg = async (req, res) => {
    
    try {
        //geting form request 
        const { fullname, email, password, socketId, status, vehicle, location } = req.body;
        const { firstname, lastname } = fullname;
        const { color, plate, capacity, vehicleType } = vehicle;
        const { lat, log } = location;
        
        //filled validation
        if (!fullname|| !fullname.firstname || !fullname.lastname  || !email || !password || !status || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType || !location.lat || !location.log) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        //User allready registration or not
        
        const user = await CaptainSchema.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Captain already exists'
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
            socketId,
            status,
            vehicle: { color, plate, capacity, vehicleType },
            location: { lat, log }
        }


        const newUser = new CaptainSchema(userdata);
        const newuser = await newUser.save();
        
        //genret the token
        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
    res.status(201).json({
    success: true,
    token:token,
    message: 'Captain registered successfully',
    data: newUser
});

    } catch (error) {
   console.error(error);
    res.status(500).json({
        success: false,
        message: 'An error occurred during registration',
        error: error.message
    });
    
    }
}


//==========================Captain login =========================


const captainlogin = async (req, res) => { 


    try {
        
        const { email, password } = req.body;


        //filled validation
        if (!email ||!password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        
        const user = await CaptainSchema.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Captain not found'
            });
        }


//comaepare the password fields 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { 
           return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
          
        }

        //gentrate the token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {expiresIn: '24h'});
        
        res.status(200).json({
            success: true,
            token: token,
            message: 'Captain logged in successfully'
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



//==========================profile of captain

const captainprofile = async (req, res) => { 
const { captainid } = req.body;
    try {
        const user = await CaptainSchema.findById(userid).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Captain not found'
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



//=================Logout-user================

const captainlogout = async (req, res) => {
    try {
        
    const { token } = req.headers;
        await blacklistTokenSchema.create({ token })

        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });

    } catch (error) {
    console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}



module.exports = { captainreg, captainlogin ,captainprofile ,captainlogout };