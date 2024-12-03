

const express = require('express');


//import of the file
const { userRegisteration, userLogin ,userProfile ,userlogout} = require('../contorell/UserController.js');
const {AuthUser}= require('../middleware/AuthUser.js')


const UserRouter = express.Router();

//routes
UserRouter.post('/user/register', userRegisteration);
UserRouter.post('/user/login', userLogin);
UserRouter.get('/user/profile', AuthUser , userProfile);
UserRouter.get('/user/logout', AuthUser ,userlogout);






module.exports = { UserRouter };

