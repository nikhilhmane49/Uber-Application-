

const express = require('express');


//import of the file
const { userRegisteration } = require('../contorell/UserController.js');


const UserRouter = express.Router();

//routes
UserRouter.post('/user/register', userRegisteration);





module.exports = { UserRouter };

