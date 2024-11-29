//installation
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const DB_conncte = require('./config/DB')

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


//listen server
app.listen( 3000, () => {
    console.log(`server listening on ${port}`);
    
})