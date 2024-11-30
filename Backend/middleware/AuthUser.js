
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserRegSchema = require('../models/User/UserRegModel');


const AuthUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1] || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserRegSchema.findById(decoded._id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
}


module.exports = { AuthUser };