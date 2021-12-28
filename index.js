const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.845tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("Block-chain-database");
    const allItems = database.collection("all-items");
    const allItemscomments = database.collection("all-items-comments");
    const popularItems = database.collection("popular-items");
    const popularItemscomments = database.collection("popular-items-comments");
    const featuredItemscomments = database.collection("featured-items-comments");
    const featuredItems = database.collection("featured-items");


    //find all popularitems
    app.get('/allitems', async (req, res) => {
      const cursor = allItems.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    //find single popularitems
    app.get('/allitems/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await allItems.findOne(query);
      res.json(result);
    });


    //update a value
    app.put('/allitems/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const updateDoc = { $inc: { likes: 1 } };
      const options = { upsert: true };
      const result = await allItems.updateOne(query, updateDoc, options);
      res.send(result);
    });

    //Post all comments for popolar items
    app.post('/allitems/comments', async (req, res) => {
      const product = req.body;
      const result = await allItemscomments.insertOne(product);
      // console.log(result);
      res.json(result);
    });

    //find all popularitems
    app.get('/allitems/comments/all', async (req, res) => {
      const cursor = allItemscomments.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // //find all popularitems
    // app.get('/popularitems', async (req, res) => {
    //   const cursor = popularItems.find({});
    //   const result = await cursor.toArray();
    //   res.json(result);
    // });


    // //update a value
    // app.put('/popularitems/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const updateDoc = { $inc: { likes: 1 } };
    //   const options = { upsert: true };
    //   const result = await popularItems.updateOne(query, updateDoc, options);
    //   res.send(result);
    // });

    // //Post all comments for popolar items
    // app.post('/popularitems/comments', async (req, res) => {
    //   const product = req.body;
    //   const result = await popularItemscomments.insertOne(product);
    //   // console.log(result);
    //   res.json(result);
    // });

    //get all comments for popolar items
    // app.get('/popularitems/comments/all', async (req, res) => {
    //   const cursor = popularItemscomments.find({});
    //   const result = await cursor.toArray();
    //   res.json(result);
    // });



    // //find all featureditems
    // app.get('/featureditems', async (req, res) => {
    //   const cursor = featuredItems.find({});
    //   const result = await cursor.toArray();
    //   // console.log('find all data');
    //   res.json(result);
    // });

    // //find single popularitems
    // app.get('/featureditems/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await featuredItems.findOne(query);
    //   res.json(result);
    // });

    // //update a value
    // app.put('/featureditems/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const updateDoc = { $inc: { likes: 1 } };
    //   const options = { upsert: true };
    //   const result = await featuredItems.updateOne(query, updateDoc, options);
    //   res.send(result);
    // });

    // //Post all comments for featured items
    // app.post('/featureditems/comments', async (req, res) => {
    //   const product = req.body;
    //   const result = await featuredItemscomments.insertOne(product);
    //   // console.log(result);
    //   res.json(result);
    // });

    // //get all comments for featured items
    // app.get('/featureditems/comments/all', async (req, res) => {
    //   const cursor = featuredItemscomments.find({});
    //   const result = await cursor.toArray();
    //   res.json(result);
    // });


  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Node js, this is my Block-chain project');
})

app.listen(port, () => {
  console.log('listening to port', port);
});
