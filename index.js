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
        // services post 
        app.put('/services/:id',async(req,res)=>{
            const id = req.params.id
            const query ={_id:ObjectId(id)}
            const docs = req.body
            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: true };
            // create a document that sets the plot of the movie
            const updateItem = {
                $set:docs,
            };
            const result =await collection.updateOne(query,updateItem,options)
            res.json(result)
        })
        // services deleted request 
        app.delete('/services/:id',(req,res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const result = await collection.deleteOne(query)
            res.json(result)
        })
        // services get request 
        app.get('/services',async(req,res)=>{
            const result =await collection.find({}).toArray()
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
    res.send("<h2>Server is Running</h2>")
})



// server port start 
app.listen(port,()=>{
    console.log("server is running at ",port);
})