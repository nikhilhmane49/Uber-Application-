//installation
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

//import of other files
const DB_conncte = require('./config/DB')
const { UserRouter } = require('./routes/UserRoutes.js');
const { CaptainRouter}=require('./routes/CaptainRoutes.js');

//db connection call

DB_conncte();
// qdytt3IMrwA2VbWG


//express app setup
const app = express();


//port
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors()); 

//middleware routes

app.use('/api/users', UserRouter);

app.use('/api/captains', CaptainRouter);

//listen server
app.listen( 3000, () => {
    console.log(`server listening on 3000`);
    
})