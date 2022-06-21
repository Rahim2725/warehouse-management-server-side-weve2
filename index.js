const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


//middel ware 
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.di2q1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const phoneCollections = client.db('phoneShop').collection('service');
        const reviewCollections = client.db('phoneShop').collection('reviwes');

        app.get('/service', async (req, res) => {
            const services = await phoneCollections.find().toArray();
            res.send(services);
        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await phoneCollections.findOne(query);
            res.send(service);
        })

        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            // const query = { _id: ObjectId(id) };
            // const result = await phoneCollections.deleteOne(query);
            // res.send(result);
        })


        app.post('/service', async (req, res) => {
            const service = req.body;
            console.log(service);
            res.send(service)
        })

        app.get('/review', async(req, res) => {
            const review = await reviewCollections.find().toArray();
            res.send(review);
        })




    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log('handyman this listening prot', port);
})