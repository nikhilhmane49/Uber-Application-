
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const blacklistTokenSchema = require('../models/User/BlacklistModel');


const AuthUser = async (req, res, next) => {
    const { token } = req.headers;
    console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await blacklistTokenSchema.findOne({ token: token });
  
    
    
    if (isBlacklisted) { 

        return res.status(401).json({ message: 'Access denied , Login again' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        
        req.body.userid = decoded.id

        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
}


module.exports = { AuthUser };