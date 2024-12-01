

const express = require('express');


//import of the file
const { userRegisteration, userLogin ,userProfile } = require('../contorell/UserController.js');
const {AuthUser}= require('../middleware/AuthUser.js')


const UserRouter = express.Router();

//routes
UserRouter.post('/user/register', userRegisteration);
UserRouter.post('/user/login', userLogin);
UserRouter.get('/user/profile', AuthUser , userProfile);






module.exports = { UserRouter };

