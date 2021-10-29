const express= require('express')
const cors = require('cors')
const {MongoClient}=require('mongodb')
const ObjectId = require('mongodb').ObjectId
//express app create
const app = express()
const port = process.env.PORT || 5000

// require middleware
require('dotenv').config()
app.use(cors())
app.use(express.json())

// root get request 
app.get('/',(req,res)=>{
    res.send('./src/index.html')
})



// server port start 
app.listen(port,()=>{
    console.log("server is running at ",port);
})