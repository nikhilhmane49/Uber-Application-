const express = require('express');

const { captainreg, captainlogin , captainprofile , captainlogout} = require('../contorell/CaptainController');
const { AuthCap } = require('../middleware/AuthCap');

const CaptainRouter = express.Router();


//routes

CaptainRouter.post('/captain/register', captainreg);

CaptainRouter.post('/captain/login', captainlogin);

CaptainRouter.get('/captain/profile', AuthCap, captainprofile);

CaptainRouter.get('/captain/logout', AuthCap, captainlogout);



module.exports = { CaptainRouter };