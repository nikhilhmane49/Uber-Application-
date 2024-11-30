

const express = require('express');


//import of the file
const { userRegisteration ,userLogin } = require('../contorell/UserController.js');


const UserRouter = express.Router();

//routes
UserRouter.post('/user/register', userRegisteration);
UserRouter.post('/user/login', userLogin);





module.exports = { UserRouter };

