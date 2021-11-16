const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const uri = `mongodb+srv://dbUser2:test123@cluster0.2hugv.mongodb.net/restaurant-management?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    // console.log(err);
    const foodCollection = client.db("restaurant-management").collection("allFood");
    console.log('database connected');

    app.post('/addFood', (req, res) => {
        const newFood = req.body;
        foodCollection.insertOne(newFood)
            .then(result => {
                console.log('food added');
            })
    })

    app.get('/getFood', (req, res) => {
        foodCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/delete/:id', (req, res) => {
        foodCollection.deleteOne({_id: objectId(req.params.id)})
        .then(result => {
            console.log('deleted Successfully');
        })
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(5000, () => {
    console.log('Listening on port 5000')
  })