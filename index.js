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
// database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rtuf5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main(){
    try{
        // database client connection 
        await client.connect()
        console.log("database connection successfully");
        const database = await client.db('tourist-spot')
        const collection = await database.collection('services-place')

        // services post 
        app.post('/services',async(req,res)=>{
            const result =await collection.insertOne(req.body)
            res.json(result)
        })
        // services get request 
        app.get('/services',async(req,res)=>{
            const result =await collection.find({}).toArray()
            console.log(result);
            res.json(result)
        })

    }finally{
        // perform actions on the collection object
        // client.close();
    }

}
main().catch(console.dir())

// root get request 
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/src/index.html`)
})



// server port start 
app.listen(port,()=>{
    console.log("server is running at ",port);
})